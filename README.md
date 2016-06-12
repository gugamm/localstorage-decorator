# LOCALSTORAGE DECORATOR

LOCALSTORAGE DECORATOR is a library to help you manage browser localStorage easily.
### Version
1.0.0
### Installation

```sh
$ git clone https://github.com/gugamm/localstorage-decorator.git
```

Development
----

**with es6/typescript**
```javascript
import {LocalStorage, storageService} from 'localstorage-decorator';
```

**use in class with decorators**
```javascript

//auto-save
class Student {
    @LocalStorage(true, "STUDENT_NAME")
    public name : string;
}

//no auto-save
class Student {
    @LocalStorage(false, "STUDENT_NAME")
    public name : string;
}

//using default value
class Student {
    @LocalStorage(false, "STUDENT_NAME")
    public name : string = this.name || "my default value";
}

//default key
class Student {
    @LocalStorage(true) //key will be equal to property name. In this case, "name"
    public name : string;
}
```

**use in class without decorators**
```javascript
class Student {
    public name : string;
    
    constructor() {
      storageService.addStorageKey("STUDENT_NAME");
      this.name = storageService.getStorageValue("STUDENT_NAME");
    }
}
```
**saving values**
```javascript
//WITH DECORATOR
var student : Student = new Student();
student.name = "Banana"; //If autoSave is on, it will automatically save. Otherwise, use storageService

//WITHOUT DECORATOR
student.name = "Banana";
storageService.saveStorageByKey("STUDENT_NAME");
//or
storageService.saveAllStorages();
```
**clearing storage**
```javascript
storageService.clearStorageByKey("STUDENT_NAME");
//to clear all :
storageService.clearStorage();

(storageService.getStorageValue("STUDENT_NAME") === null) // this is true now
```

IMPORTANT
----
LocalStorage decorators automatically initialize values with null it doesnt find any value from localStorage

EXTRA
----
I did this lib to help me in angular 2 apps. You are free to use it in yours apps, but remember that storageService is not an angular 2 service. It can't be injected. Instead, just import using es6 sintax and you are free to use in your components/directives.

If autosave is on, every change in a property will trigger an JSON.stringfy. If this is a performance issue for you, turn autosave off, and save data wherever you want with storageService.

License
----

MIT

