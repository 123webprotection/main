from mitmproxy.http import HTTPFlow
import json

from protector import BaseProtector,Policy

class GenericJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        try:
            return super().default(obj)
        except TypeError:
            pass
        cls = type(obj)
        print("----" + cls.__name__)
        if not (cls.__name__ == "bytes"):
            if hasattr(cls, '__json_encode__'):
                result = obj.__json_encode__
            else:
                result = obj.__dict__
        else:
            result = obj.decode("utf-8") 
            print("**** " + result)
        return result



class HTTPEcho:
    def __init__(self):
        print("Init HTTPEcho()")

    def response(self, flow: HTTPFlow):
        myObj = {
            "req" :{
                "method": flow.request.method, 
                "http_version": flow.request.http_version, 
                "port": flow.request.port,
                "host": flow.request.pretty_host,
                "url": flow.request.pretty_url,
                "headers": flow.request.headers,
                "content": flow.request.get_text(False),
            },
            "resp": {
                "statuscode": flow.response.status_code,
                "headers": flow.response.headers,
                "steaming": flow.response.stream,
                "content": flow.response.get_text(False),
            }
        }

        a=  {
            "b":BaseProtector(Policy(),flow.request,"flow.request","method"),
        }
        print(json.dumps(a, cls=GenericJSONEncoder))