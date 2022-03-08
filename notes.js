//<div id='S8'>
if(course.days.length==1){
    let classname=course.days+course.time.substring(0,course.time.indexOf(":"))//'S'+'8'
    let p_element=document.getElementsByClassName(classname)//a 'p' tag
    p_elements[0].innerHTML=course.name
    p_elements[1].innerHTML='(Sec: '+course.section+')'
}else if(course.days.length==2){//'ST'
    for(let x in course.days){
        let classname=course.days[x]+course.time.substring(0,course.time.indexOf(":"))//'S'+'8'in 1st iteration & 'T'+'8' in 2nd iteration
        let p_elements=document.getElementsByClassName(classname)//a 'p' tag
        p_elements[0].innerHTML=course.name
        p_elements[1].innerHTML=course.name +'(Sec: '+course.section+')'
    }
}
let p_elements=document.getElementsByClassName('S8')
p_elements[0].innerHTML='PHY102'
p_elements[1].innerHTML='(Sec:2)'
///////////////////////////////////////
function remove_invalid_routines_and_return(){
    let indexes_to_remove=[1,3]
    for(let i=0;i<list_of_routines.length;i++){
        for(let w=0;w<list_of_routines[i].length;w++){
            for(let j=0;j<list_of_routines[i].length;j++){
                let days_of_w=list_of_routines[i][w].days
                let days_of_j=list_of_routines[i][j].days
                let time_clash=(list_of_routines[i][w].time==list_of_routines[i][j].time)?true:false
                if(j!=w){
                    if(days_of_w.length==1 && days_of_j.indexOf(days_of_w) && timeclash==true){//"S" and "ST"
                        indexes_to_remove.push(i)
                    }else if(days_of_j.length==1 && days_of_w.indexOf(days_of_j) && timeclash==true){//"MW" and "M"
                        indexes_to_remove.push(i)
                    }else if(days_of_w==days_of_j && timeclash==true){
                        indexes_to_remove.push(i)
                    }
                }
            }
        }
    }
    let list=list_of_routines.filter((x,index)=>{
        if(indexes_to_remove.indexOf(index)==-1){
            return true
        }
    })
    return list
}

