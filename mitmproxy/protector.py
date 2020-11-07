import json

class Policy:
    def __init__(self):
        pass

    def check(self, name):
        print("Checked: " + name)
        return True;


class BaseProtector:
    # Protector need to be native because it holds setter,getter

    policy = None;
    _getter = (lambda : "<empty>")
    _setter = (lambda x: "<no action>")
    name = "<no name>"

    def __init__(self, policy,name,setter,getter):
        self.policy = policy
        self.name = name
        self._setter = setter
        self._getter = getter

    def read(self):
        key = self.name + ".read"
        if self.policy.check(key):
            return self._getter();
        else:
            return "!!Protected READ!! (" + key + ")"

    def write(self,value):
        key = self.name + ".write"
        if self.policy.check(key):
            return self._setter(value);
        else:
            print("!!Protected Write!! (" + key + ")")

class QckLmda:
    @staticmethod
    def getobj(obj, prop):
        return (lambda: getattr(obj,prop));

    @staticmethod
    def setobj(obj,prop):
        return (lambda x: exec('obj.' + prop + '=x',{'obj':obj,'x': x}))

    @staticmethod
    def getdict(obj, prop):
        return (lambda: obj[prop]);

    @staticmethod
    def setdict(obj,prop):
        return (lambda x: exec('obj["' + prop + '"]=x',{'obj':obj,'x': x}))

""" 
Example:
"""

print('-----------------')
class a:
    b=2 
bp = BaseProtector(Policy(),"a.b",
    QckLmda.setobj(a,"b"),QckLmda.getobj(a,"b") );
print(bp.read())
bp.write("Go go go")
print(bp.read())
print('-----------------')
a = {'b':123}
bp = BaseProtector(Policy(),"a.b",
    QckLmda.setdict(a,"b"),QckLmda.getdict(a,"b"))
print(bp.read())
bp.write("Go go go")
print(bp.read())
print(str(a)); 
print('-----------------')

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

print(json.dumps(bp, cls=GenericJSONEncoder))
