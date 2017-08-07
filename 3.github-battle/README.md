# 'this' keyword
#
# Why we need 'this' keyword
#   ->when we want to reference a single function from multiple objects
#   ->when we have 1 function, and bunch of objects that has similar Properties
#   ->then function should work through all the objects

# 4 rules
#   1. Implicit binding
#   2. Explicit binding
#   3. New binding
#   4. Window binding

# Where is function invoked
# eg.
# var sayName(name) {
#   console.log('Name: ' + name);
# }
# If we ask what would be console.log of above syntax
# we would not know, coz its not invoked
# sayName('zainab');
# -> its the exact same with 'this' keyword
# ->we wont know what this keyword word be until its invoked

##########################################################################################################################

# 1. Implicit binding
#     -> left of the dot at the call time

# eg.1
# var me = {
#   name: 'zainab',
#   sayName: function() {
#     console.log(me.name);
#     (this can also be written as console.log(this.name));
#   }
# };
# me.sayName();               //zainab
# Implicit binding says,
# look to the left of the function, what is to the left of it is the 'this' keyword

# eg.2
# var sayNameMixin = function(obj) {
#   obj.sayName = functiuon() {
#      console.log(this.name);
#   }   
# }
# var me = {
#   name: 'Ashiya'
# }
# var you = {
#   name: 'Rafeeq'
# }
# sayNameMixin(me);
# sayNameMixin(you);
# me.sayName();             //Ashiya
# you.sayName();            //Rafeeq

# eg.3
# var Person = function( name, age) {
#    return {
#      name: name,
#      age: age,
#      sayName: function() {
#        console.log(this.name);
#      },
#      mother: {
#        name: 'Ashiya',
#        sayName: function() {
#          console.log(this.name);
#        }
#      }
#    }
# }
# var zainab = Person('zainab', 2);
# zainab.sayName();               //zainab
# zainab.mother.sayName();        //Ashiya

# look at the left of function invocation, this points to that

#########################################################################################################################

# 2. Explicit binding
#     -> call, apply, bind
#
# eg.1
# var person = {
#   name: 'Ashiya',
#   sayName: function()  {
#     console.log(this.name);
#   }
# }
# person.sayName() ;              //Ashiya
#
# what if the function is outside of object ie. global
# if we want to call the function in context of person object
# like
#  var sayName = function()  {
#     console.log(this.name);
#   }
# var person = {
#   name: 'Ashiya'
# }
# sayName.call(person);
# -> every function has .call property which allows us to do that
# -> first argument of call is the context that we want to call
# -> all the arguments after that is arguments passed to the function as normal argument

# eg.2
# var sayName = function(lang1, lang2, lang3)  {
#   console.log('My name is ' + this.name + 'and I know ' + lang1 + ', ' + lang2 + ' and ' + lang3);
# };
# var person = {
#   name: 'Ashiya'
# };
# var languages = ['js', 'react', 'java'];
# sayName.call(person, languages[0], languages[1], languages[2]);
#
# wouldnt it be nice if we could pass the array of arguments instead of separate arguments
# thats what .apply does
# like
# var sayName = function(lang)  {
#   console.log('My name is ' + this.name + 'and I know ' + lang[0] + ', ' + lang[1] + ' and ' + lang[3]);
# };
# var person = {
#   name: 'Ashiya'
# };
# var languages = ['js', 'react', 'java'];
# sayName.apply(person, languages);
#
# .bind is same as .call but
# instead of invoking the function immediately,
# it will return brand new function that can be used later
# like
# var sayName = function(lang1, lang2, lang3)  {
#   console.log('My name is ' + this.name + 'and I know ' + lang1 + ', ' + lang2 + ' and ' + lang3);
# };
# var person = {
#   name: 'Ashiya'
# };
# var languages = ['js', 'react', 'java'];
# var newFn = sayName.bind(person, languages[0], languages[1], languages[2]);
# console.log('HERE');
# newFn();

########################################################################################################################

# 3. New binding
# eg.
# var Animal = function(name, color, age) {
#    this.name = name;
#    this.color = color;
#    this.age = age;
# };
# var zebra = new Animal('zorro', 'black and white', 3);
# -> when we call with 'new' keyword,
# -> js will create a brand new object for us as 'this'
# -> the 'this' keyword is bound to the object being constructed(ie.'this' object)

########################################################################################################################

# 4. Window binding
# eg1.
# var sayAge = function() {
#   console.log(this.age) ;
# }
# var me = {
#   age: 26
# }
# -> we usually call this using sayAge.call(me)
# -> what if we do
# sayAge();                   //undefined
# when we dont have new/call/apply/bind,
# the 'this' keyword will default to window object
# window.age = 4;
# sayAge();                   //4

# but if we run in strict mode, it will throw typeerror
# like
# var sayAge = function() {
#   'use strict'    ;
#   console.log(this.age) ;
# }
# var me = {
#   age: 26
# }
# window.age = 4;
# sayAge();                 //TypeError
