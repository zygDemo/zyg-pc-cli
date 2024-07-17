export const WrapperDate = (value, format) => {

  let date = '',arr = [];
  if(!Array.isArray(value) && value.length == 8){
    arr = [value.slice(0,4),value.slice(4,6),value.slice(6,8)]
  }else{
    arr = value||[]
  }

  arr?.forEach((item,index) => {
    if(index < arr.length - 1){
      date += item + format;
    }else{
      date += item;
    }
  });
  console.log(arr,value,format)
  return date;
}