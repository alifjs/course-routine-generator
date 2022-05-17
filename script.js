/*--------------functions--------------*/
function show_dustbin(e){
    let dustbin=e.currentTarget.children[4]
    setTimeout(()=>{
        dustbin.style.visibility="visible"
    },100)
}
function hide_dustbin(e){
    let dustbin=e.currentTarget.children[4]
    setTimeout(()=>{
        dustbin.style.visibility="hidden"
    },100)
}
function create_course_object_from_inputs(){
    let course_name=document.querySelector('.course_input div:nth-child(1) input').value
    let section=document.querySelector('.course_input div:nth-child(2) select').value
    let days=document.querySelector('.course_input div:nth-child(3) select').value
    let time=document.querySelector('.course_input div:nth-child(4) select').value

    return new Course(course_name,section,days,time)
}
function create_clone_of_individual_course_template(){
    let individual_course_template=document.querySelector('.individual_course')
    return individual_course_template.cloneNode(true)
}
function populate_clone_with_course_data(clone,course){
    clone.children[0].innerHTML=course.name.toUpperCase()
    clone.children[1].innerHTML=course.section
    clone.children[2].innerHTML=course.days
    clone.children[3].innerHTML=course.time
}
function append_the_clone_in_html(clone){
    let br=document.createElement('br')
    let br2=document.createElement('br')
    let parent=document.querySelector('.container')
    parent.insertBefore(clone,parent.children[parent.children.length-1])
    parent.insertBefore(br,parent.children[parent.children.length-1])
    parent.insertBefore(br2,parent.children[parent.children.length-1])
}
function does_x_match_the_course(x){
    if(x.name==course.name &&
        x.section==course.section &&
        x.days==course.days &&
        x.time==course.time){
        return true
    }else{
        return false
    }
}
function show_generate_routines_button(){
    let generate_routines_button=document.querySelector('.generate_routines')
    generate_routines_button.style.display='flex'
}
function hide_generate_routines_button_if_no_courses_are_there(){
    if(list_of_courses.length==0){
        let generate_routines_button=document.querySelector('.generate_routines')
        generate_routines_button.style.display='none'
    }
}
function convert_list_of_courses_into_2d_list_of_courses(){
    let courses_already_added=[]
    let two_d_list_of_courses=[]
    for(let i=0;i<list_of_courses.length;i++){
        if(courses_already_added.indexOf(list_of_courses[i].name)==-1){
            courses_already_added.push(list_of_courses[i].name)
            let list=[list_of_courses[i]]
            for(let j=i+1;j<list_of_courses.length;j++){
                if(list_of_courses[j].name==list_of_courses[i].name){
                    list.push(list_of_courses[j])
                }
            }
            two_d_list_of_courses.push(list)
        }
    }
    return two_d_list_of_courses
}
function combinator(list,daddy_list){
    let list3=[]
    if(daddy_list.length==0){
        for(let x in list){
            list3.push([list[x]])
        }
        return list3
    }
    for(let x in list){
        for(let y in daddy_list){
            let list2=[list[x]]
            list2.push(...daddy_list[y])
            list3.push(list2)
        } 
    }
    return list3
}
function convert_2d_list_of_courses_into_list_of_routines(two_d_list_of_courses){
    let list=[]
    for(let i=0;i<two_d_list_of_courses.length;i++){//list_of_courses=[['phy102','phy102'],['cse104','cse104'],['mat203','mat203']]
        list=combinator(two_d_list_of_courses[i],list)
    }
    return list
}
function remove_invalid_routines_and_return(){
    let indexes_to_remove=[]
    for(let i=0;i<list_of_routines.length;i++){
        for(let w=0;w<list_of_routines[i].length;w++){
            for(let j=0;j<list_of_routines[i].length;j++){
                let days_of_w=list_of_routines[i][w].days
                let days_of_j=list_of_routines[i][j].days
                let time_clash=(list_of_routines[i][w].time==list_of_routines[i][j].time)?true:false
                if(j!=w){
                    if(days_of_w.length==1 && days_of_j.indexOf(days_of_w)!=-1 && time_clash==true){//"S" and "ST"
                        indexes_to_remove.push(i)
                    }else if(days_of_j.length==1 && days_of_w.indexOf(days_of_j)!=-1 && time_clash==true){//"MW" and "M"
                        indexes_to_remove.push(i)
                    }else if(days_of_w==days_of_j && time_clash==true){
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
function populate_routine_with_current_routine_index(routine){//['cse104','mat203','phy102']
    let all_void_boxes=document.querySelectorAll('.void_box p')
    for(let i=0;i<all_void_boxes.length;i++){
        all_void_boxes[i].innerHTML=''
    }
    for(let x in routine){
        let class_hour=routine[x].get_class_hour()
        for(let i=0;i<routine[x].days.length;i++){
            let box_class_name='.'+routine[x].days[i]+class_hour
            let first_p_element=document.querySelector(box_class_name)
            first_p_element.innerHTML=routine[x].name
            let second_p_element=document.querySelector(box_class_name+':nth-of-type(2)')
            second_p_element.innerHTML='sec : '+ routine[x].section
        }
    }
}
//---------------------------------------------------------------------//
class Course{
    constructor(name,section,days,time){
        this.name=name.toUpperCase()
        this.section=section
        this.days=days
        this.time=time
    }
    get_class_hour(){
        if(this.time=="11:20"){
            return "11"
        }else{
            return this.time.substring(0,1)
        }
    }
}
let add_button=document.querySelector('.add_button')
let list_of_courses=[]

add_button.addEventListener('click',()=>{
    show_generate_routines_button()
    let course=create_course_object_from_inputs()
    list_of_courses.push(course)
    //////////////////////////////////////////////////////
    let clone=create_clone_of_individual_course_template()
    clone.style.display='inline-flex'
    populate_clone_with_course_data(clone,course)
    clone.addEventListener('mouseover',show_dustbin)
    clone.addEventListener('mouseout',hide_dustbin)
    append_the_clone_in_html(clone)
    /*if the trash is clicked on, then delete the component and remove the
    course from the list_of_courses*/
    clone.children[4].addEventListener('click',()=>{
        clone.nextElementSibling.remove()
        clone.nextElementSibling.remove()
        clone.remove()
        list_of_courses.splice(list_of_courses.findIndex((x)=>{
            if(x.name==course.name &&
                x.section==course.section &&
                x.days==course.days &&
                x.time==course.time){
                return true
            }else{
                return false
            }
        }),1)
        hide_generate_routines_button_if_no_courses_are_there()
    })
})
/*------------------when the generate routines button is clicked-------------*/
let generate_routines_button=document.querySelector('.generate_routines')
let list_of_routines=[]
let current_routine_index=0

generate_routines_button.addEventListener('click',()=>{
    if(list_of_courses!=0){
        document.querySelector('.routine_container').style.display='flex'
        let two_d_list_of_courses= convert_list_of_courses_into_2d_list_of_courses()//[['phy102l','phy102l'],['cse104','cse104']]
        list_of_routines=convert_2d_list_of_courses_into_list_of_routines(two_d_list_of_courses)
        list_of_routines=remove_invalid_routines_and_return()
        populate_routine_with_current_routine_index(list_of_routines[0])
        let page_num_element=document.querySelector('.routines_navigation p:nth-of-type(2)')
        page_num_element.innerHTML=' 1/'+list_of_routines.length+' '
    }
})

let next_button=document.querySelector('#next_sign')
next_button.addEventListener('click',()=>{
    if((current_routine_index+1)<list_of_routines.length){
        current_routine_index++
        let page_num_element=document.querySelector('.routines_navigation p:nth-of-type(2)')
        page_num_element.innerHTML=(current_routine_index+1).toString()
                                    +'/'+list_of_routines.length+' '
        populate_routine_with_current_routine_index(list_of_routines[current_routine_index])                            
    }
})

let previous_button=document.querySelector('#previous_sign')
previous_button.addEventListener('click',()=>{
    if((current_routine_index+1)!=1){
        current_routine_index--
        let page_num_element=document.querySelector('.routines_navigation p:nth-of-type(2)')
        page_num_element.innerHTML=(current_routine_index+1).toString()
                                    +'/'+list_of_routines.length+' '
        populate_routine_with_current_routine_index(list_of_routines[current_routine_index])                            
    }
})





