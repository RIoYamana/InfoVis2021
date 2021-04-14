class Vec3{
  constructor(x,y,z){
    this.x=x;
    this.y=y;
    this.z=z;
  }
  add(v){
    this.x+=v.x;
    this.y+=v.y;
    this.z+=v.z;
    return this;
  }
  squ(){
    return (this.x)**2+(this.y)**2+(this.z)**2;
  }
  inn(v){
    return this.x*v.x+this.y*v.y+this.z*v.z;
  }
  sub(v){
    this.x-=v.x;
    this.y-=v.y;
    this.z-=v.z;
    return this;
  }
  sum(){
    return this.x+this.y+this.z;
  }
  min(){
    var first=this.x;
    var second=this.y;
    var third=this.z;
    var a;
    if(first>second){
      a=first;
      first=second;
      second=a;
    }
    if(second>third){
      a=second;
      second=third;
      third=a;
    }
    if(first>second){
      a=first;
      first=second;
      second=a;
    }
    return first;
  }
  mid(){
    var first=this.x;
    var second=this.y;
    var third=this.z;
    var a;
    if(first>second){
      a=first;
      first=second;
      second=a;
    }
    if(second>third){
      a=second;
      second=third;
      third=a;
    }
    if(first>second){
      a=first;
      first=second;
      second=a;
    }
    return second;
  }
  max(){
    var first=this.x;
    var second=this.y;
    var third=this.z;
    var a;
    if(first>second){
      a=first;
      first=second;
      second=a;
    }
    if(second>third){
      a=second;
      second=third;
      third=a;
    }
    if(first>second){
      a=first;
      first=second;
      second=a;
    }
    return third;
  }
}
