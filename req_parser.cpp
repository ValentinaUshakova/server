#include <stdexcept>
#include <iostream>
#include <memory>
#include <cassert>

/**
* structure for keeping the nessesary information about request 
* @file req_parser.cpp
*/
struct  request
{
    std::string type;/**<type of request*/
    std::string uri;/**<url of request*/
};

/**
*function for checking the request accuracy 
*/
std::string req_parser(request* req)
{
    std::string result;
    if ((req->type == "HEAD") || (req->type == "POST") || (req->type == "GET"))
    {
        result += req->type;
    }
    else
    { 
        result += "false";
        return result;
    }

    result += " ";

    if (req->uri == "/")
        result += "root";
    else if (req->uri.substr(req->uri.length() - 5) == ".html")
        result += "html";
    else if ((req->uri.substr(req->uri.length() - 4) == ".bmp") || (req->uri.substr(req->uri.length() - 4) == ".jpg") || (req->uri.substr(req->uri.length() - 4) == ".png") || (req->uri.substr(req->uri.length() - 5) == ".jpeg") )
        result += "image";
    else 
        result = "false";

    return result;
}

bool test_get_root() {
    request *r = new request(); 
    r->type = "GET";
    r->uri = "/";
    assert(req_parser(r) == "GET root");
    return true;
}

bool test_post_root() {
    request *r = new request(); 
    r->type = "POST";
    r->uri = "/";
    assert(req_parser(r) == "POST root");
    return true;
}

bool test_head_root() {
    request *r = new request(); 
    r->type = "HEAD";
    r->uri = "/";
    assert(req_parser(r) == "HEAD root");
    return true;
}

bool test_get_image_jpg() {
    request *r = new request(); 
    r->type = "GET";
    r->uri = "a.jpg";
    assert(req_parser(r) == "GET image");
    return true;
}

bool test_post_image_jpg() {
    request *r = new request(); 
    r->type = "POST";
    r->uri = "a.jpg";
    assert(req_parser(r) == "POST image");
    return true;
}

bool test_head_image_jpg() {
    request *r = new request(); 
    r->type = "HEAD";
    r->uri = "a.jpg";
    assert(req_parser(r) == "HEAD image");
    return true;
}

bool test_get_image_png() {
    request *r = new request(); 
    r->type = "GET";
    r->uri = "a.png";
    assert(req_parser(r) == "GET image");
    return true;
}

bool test_post_image_png() {
    request *r = new request(); 
    r->type = "POST";
    r->uri = "a.png";
    assert(req_parser(r) == "POST image");
    return true;
}

bool test_head_image_png() {
    request *r = new request(); 
    r->type = "HEAD";
    r->uri = "a.png";
    assert(req_parser(r) == "HEAD image");
    return true;
}

bool test_get_image_bmp() {
    request *r = new request(); 
    r->type = "GET";
    r->uri = "a.bmp";
    assert(req_parser(r) == "GET image");
    return true;
}

bool test_post_image_bmp() {
    request *r = new request(); 
    r->type = "POST";
    r->uri = "a.bmp";
    assert(req_parser(r) == "POST image");
    return true;
}

bool test_head_image_bmp() {
    request *r = new request(); 
    r->type = "HEAD";
    r->uri = "a.bmp";
    assert(req_parser(r) == "HEAD image");
    return true;
}

bool test_get_image_jpeg() {
    request *r = new request(); 
    r->type = "GET";
    r->uri = "a.jpeg";
    assert(req_parser(r) == "GET image");
    return true;
}

bool test_post_image_jpeg() {
    request *r = new request(); 
    r->type = "POST";
    r->uri = "a.jpeg";
    assert(req_parser(r) == "POST image");
    return true;
}

bool test_head_image_jpeg() {
    request *r = new request(); 
    r->type = "HEAD";
    r->uri = "a.jpeg";
    assert(req_parser(r) == "HEAD image");
    return true;
}

bool test_get_html() {
    request *r = new request(); 
    r->type = "GET";
    r->uri = "a.html";
    assert(req_parser(r) == "GET html");
    return true;
}

bool test_post_html() {
    request *r = new request(); 
    r->type = "POST";
    r->uri = "a.html";
    assert(req_parser(r) == "POST html");
    return true;
}

bool test_head_html() {
    request *r = new request(); 
    r->type = "HEAD";
    r->uri = "a.html";
    assert(req_parser(r) == "HEAD html");
    return true;
}

bool test_get_wrong_input() {
    request *r = new request(); 
    r->type = "GET";
    r->uri = "a.html1";
    assert(req_parser(r) == "false");
    return true;
}

bool test_post_wrong_input() {
    request *r = new request(); 
    r->type = "POST";
    r->uri = "ahtml";
    assert(req_parser(r) == "false");
    return true;
}

bool test_head_wrong_input() {
    request *r = new request(); 
    r->type = "HEAD";
    r->uri = "a.jpg1";
    assert(req_parser(r) == "false");
    return true;
}

bool test_options_wrong_input() {
    request *r = new request(); 
    r->type = "OPTIONS";
    r->uri = "a.jpg";
    assert(req_parser(r) == "false");
    return true;
}

bool test_put_wrong_input() {
    request *r = new request(); 
    r->type = "PUT";
    r->uri = "a.jpg";
    assert(req_parser(r) == "false");
    return true;
}

bool run_tests() {
    std::cout << "Run" << std::endl;

    test_get_root();
    std::cout << "+ ";

    test_post_root();
    std::cout << "+ ";

    test_head_root();
    std::cout << "+ ";

    test_get_image_jpg();
    std::cout << "+ ";

    test_post_image_jpg();
    std::cout << "+ ";

    test_head_image_jpg();
    std::cout << "+ ";

    test_get_image_png();
    std::cout << "+ ";

    test_post_image_png();
    std::cout << "+ ";

    test_head_image_png();
    std::cout << "+ ";

    test_get_image_bmp();
    std::cout << "+ ";

    test_post_image_bmp();
    std::cout << "+ ";

    test_head_image_bmp();
    std::cout << "+ ";

    test_get_image_jpeg();
    std::cout << "+ ";

    test_post_image_jpeg();
    std::cout << "+ ";

    test_head_image_jpeg();
    std::cout << "+ ";

    test_get_html();
    std::cout << "+ ";

    test_post_html();
    std::cout << "+ ";

    test_head_html();
    std::cout << "+ ";

    test_get_wrong_input();
    std::cout << "+ ";

    test_post_wrong_input();
    std::cout << "+ ";

    test_head_wrong_input();
    std::cout << "+ ";

    test_options_wrong_input();
    std::cout << "+ ";

    test_put_wrong_input();
    std::cout << "+ ";

    std::cout << std::endl;
    return true;
}