class Father{
    drive(){
        console.log("Father can drive");
    }
}
class Mother{
    cook(){
        console.log("Mother can cook");
    }
}
class Child extends Father{
    code(){
        console.log("Child can code");
    }
}

Child.prototype.cook=Mother.prototype.cook;

let c=new Child();

c.drive();
c.cook();
c.code();