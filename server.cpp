#include <stdexcept>
#include <iostream>
#include <memory>
#include <chrono>
#include <thread>
#include <cstdint>
#include <vector>
// #include "libevent-2.1.8-stable/include/evhttp.h"
#include <evhttp.h>

// #include "boost/program_options.hpp" 
// #include "boost/filesystem.hpp" 
#include <boost/program_options.hpp>
#include <boost/filesystem.hpp>

struct server_data
{
  std::string ip;
  int port;
  int workers;
  bool verbose; 
  bool help;
};

using namespace boost::program_options;

server_data cmline_parser(int argc, char *argv[])
{
    server_data sd;
    sd.verbose=false;
    sd.help=false;
    variables_map vm;
    options_description desc("Options");
    std::string ip = "";
    try{
        std::string appName = boost::filesystem::basename(argv[0]); 
        desc.add_options()
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

  if (!event_init())
  {
    std::cerr << "Failed to init libevent." << std::endl;
    return -1;
  }

  char *SrvAddress = const_cast<char*>((sd.ip).c_str());
  std::uint16_t SrvPort = sd.port;
  int const SrvThreadCount = sd.workers;
 
  std::cout<<"ip - "<<SrvAddress<<std::endl;
  std::cout<<"port - "<<SrvPort<<std::endl;
  std::cout<<"workers - "<<SrvThreadCount<<std::endl;
  std::cout<<"verbose - "<<sd.verbose<<std::endl;

  try
  {
    void (*OnRequest)(evhttp_request *, void *) = [] (evhttp_request *req, void *)
    {
      auto *OutBuf = evhttp_request_get_output_buffer(req);
      if (!OutBuf)
        return;
      evbuffer_add_printf(OutBuf, "<html><body><center><h1>Hello World!</h1></center></body></html>");
      evhttp_send_reply(req, HTTP_OK, "", OutBuf);
    };

    std::exception_ptr InitExcept;
    bool volatile IsRun = true;
    evutil_socket_t Socket = -1;

    auto ThreadFunc = [&] ()
    {
      try
      {
        std::unique_ptr<event_base, decltype(&event_base_free)> EventBase(event_base_new(), &event_base_free);
        if (!EventBase)
          throw std::runtime_error("Failed to create new base_event.");
        std::unique_ptr<evhttp, decltype(&evhttp_free)> EvHttp(evhttp_new(EventBase.get()), &evhttp_free);
        if (!EvHttp)
          throw std::runtime_error("Failed to create new evhttp.");
          evhttp_set_gencb(EvHttp.get(), OnRequest, nullptr);
        if (Socket == -1)
        {
          auto *BoundSock = evhttp_bind_socket_with_handle(EvHttp.get(), SrvAddress, SrvPort);
          if (!BoundSock)
            throw std::runtime_error("Failed to bind server socket.");
          if ((Socket = evhttp_bound_socket_get_fd(BoundSock)) == -1)
            throw std::runtime_error("Failed to get server socket for next instance.");
        }
        else
        {
          if (evhttp_accept_socket(EvHttp.get(), Socket) == -1)
            throw std::runtime_error("Failed to bind server socket for new instance.");
        }
        for ( ; IsRun ; )
        {
          event_base_loop(EventBase.get(), EVLOOP_NONBLOCK);
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
      ThreadPtr Thread(new std::thread(ThreadFunc), ThreadDeleter);
      std::this_thread::sleep_for(std::chrono::milliseconds(500));
      if (InitExcept != std::exception_ptr())
      {
        IsRun = false;
        std::rethrow_exception(InitExcept);
      }
      Threads.push_back(std::move(Thread));
    }

    std::cout << "Press Enter fot quit." << std::endl;
    std::cin.get();
    IsRun = false;
  }
  catch (std::exception const &e)
  {
    std::cerr << "Error: " << e.what() << std::endl;
  }
  return 0;
}