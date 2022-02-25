//Showing the dustbin when the mouse comes over an individual course
let individual_course=document.querySelector('.individual_course')

individual_course.addEventListener('mouseover',()=>{
    let dustbin=document.querySelector('img')
    setTimeout(()=>{
        dustbin.style.visibility="visible"
    },100)
})
individual_course.addEventListener('mouseout',()=>{
    let dustbin=document.querySelector('img')
    setTimeout(()=>{
        dustbin.style.visibility="hidden"
    },100)
})
//---------------------------------------------------------------------//
class Course{
    constructor(name,section,days,time){
        this.name=name
        this.section=section
        this.days=days
        this.time=time
    }
}
let add_button=document.querySelector('.add_button h1')

add_button.addEventListener('click',()=>{
    let course_name=document.querySelector('.course_input div:nth-child(1) input').value
    let section=document.querySelector('.course_input div:nth-child(2) select').value
    let days=document.querySelector('.course_input div:nth-child(3) select').value
    let time=document.querySelector('.course_input div:nth-child(4) select').value

    console.log(course_name,section,days,time)
})


