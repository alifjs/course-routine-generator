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
    //parent.append(clone,br,br2)
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
//---------------------------------------------------------------------//
class Course{
    constructor(name,section,days,time){
        this.name=name
        this.section=section
        this.days=days
        this.time=time
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
    ////////////////////////////////////////////////////////////////
    
})


