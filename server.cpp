#include <stdexcept>
#include <iostream>
#include <memory>
#include <chrono>
#include <thread>
#include <cstdint>
#include <vector>
#include <evhttp.h>
#include <unistd.h>
#include <time.h>

#include <boost/program_options.hpp>
#include <boost/filesystem.hpp>

char* PATH;
bool verbose;
time_t t=time(NULL);
using namespace std::chrono;

struct server_data
{
  std::string path;
  std::string ip;
  int port;
  int workers;
  bool verbose; 
  bool help;
};

using namespace boost::program_options;
using namespace boost::filesystem;

server_data cmline_parser(int argc, char *argv[])
{
    server_data sd;
    sd.verbose=false;
    sd.help=false;
    variables_map vm;
    options_description desc("Options");
    std::string ip = "";
    try{
        std::string appName = basename(argv[0]); 
        desc.add_options()
            ("dir,d",value<std::string>()->default_value("dir"),"Path")
            ("ip,i",value<std::string>()->default_value("0.0.0.0"),"IP")
            ("port,p",value<int>()->default_value(8000),"PORT")
            ("workers,w",value<int>()->default_value(1),"Count of workers")
            ("help,h", "HELP")
            ("verbose,v","Print log");
    
        store(parse_command_line(argc, argv, desc), vm);
        notify(vm);
        
        if (vm.count("help")){
            std::cout << desc << '\n';
            sd.help=true;
            return sd;
            }
        else {
            if (vm.count("verbose")){
                sd.verbose=true;
                std::cout << desc << '\n';}
            sd.workers=vm["workers"].as<int>();
            sd.port=vm["port"].as<int>();
            sd.ip=vm["ip"].as<std::string>(); 
            sd.path=vm["dir"].as<std::string>();       
        }
    }
    catch (const error &ex)
        {
            std::cout<<"Error"<<std::endl;
            std::cerr << ex.what() << '\n';
        }

    return sd;	
} 

int server(int argc, char *argv[])
{
  server_data sd;

  sd=cmline_parser(argc, argv);

  if (sd.help==true)
    return 0;

  if (!event_init())//event_init() - Initialize the event API.
  {
    std::cerr << "Failed to init libevent." << std::endl;
    return -1;
  }

  char *SrvAddress = const_cast<char*>((sd.ip).c_str());
  std::uint16_t SrvPort = sd.port;
  int const SrvThreadCount = sd.workers;

  PATH=const_cast<char*>((sd.path).c_str());
  verbose=sd.verbose;
 
  if (verbose==1){
  std::cout<<"path - "<<PATH<<std::endl;
  std::cout<<"ip - "<<SrvAddress<<std::endl;
  std::cout<<"port - "<<SrvPort<<std::endl;
  std::cout<<"workers - "<<SrvThreadCount<<std::endl;
  std::cout<<"verbose - "<<sd.verbose<<std::endl;
  }

  try
  {
    //What_to_do_on_Requests
    void (*OnRequest)(evhttp_request *, void *) = [] (evhttp_request *req, void *)
    {
      high_resolution_clock::time_point begin_time=high_resolution_clock::now();
      auto *OutBuf = evhttp_request_get_output_buffer(req);//getting the output buffer
      if (!OutBuf)
        return;
      
      const char* request=evhttp_request_get_uri(req);
      if (strcmp(request,"/")==0) 
      {
          if (verbose==1)
          {
            t=time(NULL);
            std::cout<<asctime(localtime(&t))<<std::this_thread::get_id()<<"  /  200 OK"<<std::endl;
          }
          evbuffer_add_printf(OutBuf, "<html><body><center><h1>Welcome! <h1><h2>Enter the name of the file!</h2></center></body></html>");
          evhttp_send_reply(req, HTTP_OK, "OK", OutBuf);//sending an HTML reply to the client
      }
      else 
      {
        char temp_request[50];
        strcpy(temp_request,PATH);
        strcat(temp_request,request); 
        FILE *f;
        if (strcmp(request + strlen(request) - 4, "html") == 0)
            f = fopen(temp_request, "r");
        else 
            f = fopen(temp_request, "rb");
        if (!f)
        {
          if (verbose==1){
            t=time(NULL);
            std::cout<<asctime(localtime(&t))<<std::this_thread::get_id()<<"  "<<temp_request<<" 404 Not found"<<std::endl;
          }
          evbuffer_add_printf(OutBuf, "<html><body><center><h1>404   FILE  NOT  FOUND   404</h1></center></body></html>");
          evhttp_send_reply(req, HTTP_NOTFOUND, "NOT FOUND", OutBuf);//sending an HTML reply to the client
        }
        else
        {
          if (strcmp(request + strlen(request) - 4, "html") == 0)
          {
            char *buf = new char[10000];
            fread(buf, sizeof(char), 10000, f);
            evbuffer_add_printf(OutBuf, buf);
            if (verbose==1)
            {
              t=time(NULL);
              std::cout<<asctime(localtime(&t))<<std::this_thread::get_id()<<"  "<<temp_request<<" 200 OK"<<std::endl;
            }
            evhttp_send_reply(req, HTTP_OK, "OK", OutBuf);//sending an HTML reply to the client
            delete []buf;
          }
          else
          {	
            evkeyvalq* h_buf=evhttp_request_get_output_headers(req);

            evhttp_remove_header(h_buf, "Content-Type");
            evhttp_add_header(h_buf, "Content-Type", "image/bmp");		
            int fd=fileno(f);
            evbuffer_add_file(OutBuf, fd, 0, 100000000);
            if (verbose==1)
            {
              t=time(NULL);
              std::cout<<asctime(localtime(&t))<<std::this_thread::get_id()<<"  "<<temp_request<<" 200 OK"<<std::endl;
            }
            evhttp_send_reply(req, HTTP_OK, "OK", OutBuf);//sending an HTML reply to the client
          }
           fclose(f);
        }       
      }
      high_resolution_clock::time_point end_time=high_resolution_clock::now();
      duration<double> time_span = duration_cast<duration<double>>(end_time - begin_time);

      std::cout<<std::this_thread::get_id()<<" "<<time_span.count()<<std::endl;
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////

    std::exception_ptr InitExcept;
    bool volatile IsRun = true;
    evutil_socket_t Socket = -1;

    auto ThreadFunc = [&] ()
    {
      try
      {
        //creating new event_base(structure to hold information and state for a Libevent dispatch loop)
        if (verbose==1)
        {
          t=time(NULL);
          std::cout<<asctime(localtime(&t))<<std::this_thread::get_id()<<"  creating new event_base(structure to hold information and state for a Libevent dispatch loop)"<<std::endl;
        }
        std::unique_ptr<event_base, decltype(&event_base_free)> EventBase(event_base_new(), &event_base_free);
        if (!EventBase)
          throw std::runtime_error("Failed to create new base_event.");
        ///////////////////////////////////////////////////////////////////////////////////////////////////

        //creating new EvHttp 
        if (verbose==1)
        {
          t=time(NULL);
          std::cout<<asctime(localtime(&t))<<std::this_thread::get_id()<<"  creating new EvHttp"<<std::endl;
        }
        std::unique_ptr<evhttp, decltype(&evhttp_free)> EvHttp(evhttp_new(EventBase.get()), &evhttp_free);//evhttp_new - create a new HTTP server
                                                                                                          //evhttp_free - free the previously created HTTP server. 
        if (!EvHttp)
          throw std::runtime_error("Failed to create new evhttp.");
        evhttp_set_gencb(EvHttp.get(), OnRequest, nullptr);	//Set a callback for all requests that are not caught by specific callbacks. 
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (Socket == -1)
        { 
          if (verbose==1)
          {
            t=time(NULL);
            std::cout<<asctime(localtime(&t))<<std::this_thread::get_id()<<"  Binding an HTTP server, getting a handle for referencing the socket."<<std::endl;
          }
          auto *BoundSock = evhttp_bind_socket_with_handle(EvHttp.get(), SrvAddress, SrvPort);//Binds an HTTP server on the specified address and port, 
                                                                                              //returns a handle for referencing the socket.

          if (!BoundSock)
            throw std::runtime_error("Failed to bind server socket.");
          if ((Socket = evhttp_bound_socket_get_fd(BoundSock)) == -1)//evhttp_bound_socket_get_fd - get the raw file descriptor referenced by an evhttp_bound_socket.
            throw std::runtime_error("Failed to get server socket for next instance.");
        }
        else
        {
          if (evhttp_accept_socket(EvHttp.get(), Socket) == -1)//evhttp_accept_socket - makes an HTTP server accept connections on the specified socket.
            throw std::runtime_error("Failed to bind server socket for new instance.");
        }

        for ( ; IsRun ; )
        {
          event_base_loop(EventBase.get(), EVLOOP_NONBLOCK);//Wait for events to become active, and run their callbacks.
          std::this_thread::sleep_for(std::chrono::milliseconds(10));
        }
      }

      catch (...)
      {
        InitExcept = std::current_exception();
      }
    };

    auto ThreadDeleter = [&] (std::thread *t) { IsRun = false; t->join(); delete t; };
    typedef std::unique_ptr<std::thread, decltype(ThreadDeleter)> ThreadPtr;
    typedef std::vector<ThreadPtr> ThreadPool;
    ThreadPool Threads;

    for (int i = 0 ; i < SrvThreadCount ; ++i)
    {
      if (verbose==1)
      {
        t=time(NULL);
        std::cout<<asctime(localtime(&t))<<std::this_thread::get_id()<<"  creating a new thread..."<<std::endl;
      }
      ThreadPtr Thread(new std::thread(ThreadFunc), ThreadDeleter);
      std::this_thread::sleep_for(std::chrono::milliseconds(500));
      if (InitExcept != std::exception_ptr())
      {
        IsRun = false;
        std::rethrow_exception(InitExcept);
      }
      Threads.push_back(std::move(Thread));
    }

    std::cout << "Press Enter for quit." << std::endl;
    std::cin.get();
    IsRun = false;
  }
  catch (std::exception const &e)
  {
    std::cerr << "Error: " << e.what() << std::endl;
  }
  return 0;
}