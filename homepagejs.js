var date = new Date();
    //create date array

var year = date.getFullYear();
    //assigns current year value to variable

var month = date.getMonth();

var monthnames = ["January", "February", "March", "April", 
    "May", "April", "May", "June", "July", "August", "September",
    "October", "November", "December" ];

//assigns html element to variable
var workerlist = document.querySelector('#people');
var categorylist = document.querySelector('#categories')

//gets the 'workers' list from firebase
db.collection('workers').get().then(snapshot => {
    console.log(snapshot.docs);
    snapshot.docs.forEach(doc => {
        renderWorkers(doc);
    });
})

//gets the 'categories' list from firebase
db.collection('categories').get().then(snapshot => {
    console.log(snapshot.docs);
    snapshot.docs.forEach(doc => {
        renderCategories(doc);
    });
})



// creates elements to put worker information in
function renderWorkers(doc) {
    let li = document.createElement('li');
    let a_tag = document.createElement('a');
    let distance = document.createElement('p');
    let name = document.createElement('p');
    let image = document.createElement('img');
    let star_out = document.createElement('div');
    let star_in = document.createElement('div');

    name.textContent = doc.data().name;// get name
    rating = doc.data().rating;// get rating
    km = doc.data().distance; //get distance
    imageUrl = doc.data().imageUrl; //imageurl


    /*rating from firebase is out of 5 stars. this line 
    converts it to a % value to be used as a width 
    attribute of star_in*/
    
    let conv_rating = "width:" + rating.toString() * 20 + "%";

    //adds the li element to the ul element for workers
    workerlist.appendChild(li);

    //these are the contents of the li element:
    
    
    li.appendChild(a_tag); //clicking area
    a_tag.appendChild(image).setAttribute('style', 'background-image: url(' + imageUrl + ");");
    a_tag.href = "#" + name.textContent;
    
    a_tag.appendChild(name);//name of worker
    name.classList.add('name');

    a_tag.appendChild(distance);//distance from worker
    distance.textContent = km.toString() + " km";
    distance.classList.add('distance');

    a_tag.appendChild(star_out);//outer stars (the outline)
    star_out.classList.add('star_out');

    star_out.appendChild(star_in);//inner star (the yellow part)
    star_in.classList.add('star_in');
    star_in.setAttribute('style', conv_rating);

    /* This is how it will look in HTML:
    <li>
    <a>
    <img>
    <p class = "name"></p>
    <p class = "distance"></p>
    <p class = "name"></p>
    <div class = "star_out"><div class = "star_in">
    </a>
    </li>
    */

}

//add the category list to the ul tag for categories
function renderCategories(doc) {
    let li = document.createElement('li');
    let a_tag = document.createElement('a');
    let name = document.createElement('p');
    let image = document.createElement('img');



    name.textContent = doc.data().name;//category name
    imageUrl = doc.data().imageUrl;//image url


    /*take out spacing in category name to put in the 
    href attribute of <a> tag */
    var hrefer = name.textContent.replace(/\s/g, "");

    //create li element that will hold name and image
    categorylist.appendChild(li);
    

    //add child a_tag
    li.appendChild(a_tag);


    //add category image to <image> tag
    a_tag.appendChild(image).setAttribute('style', 'background-image: url(' + imageUrl + ");");


    //add href to name tag and category name
    a_tag.href = "#" + hrefer;
    a_tag.appendChild(name);
    name.classList.add('name');
    
    /* This is how it will look in HTML:
    <li>
    <a>
    <img>
    <p class = "name"></p>
    </a>
    </li>
    */

}



//put date in calendar
function CurDate() {

/*date.getMonth gives month number. The next line 
puts the month number "n" from date.getMonth into 
the index of monthnames array to assign a string 
month value to "month" variable*/

    var month_name = monthnames[date.getMonth()]

    //add month name to month name element in html
   document.getElementById("month_name").textContent = month_name;
    
    //add year to year element in html
    document.getElementById("year_name").innerHTML = year;
    
    //adds all dates on calender to array
    var days = document.getElementsByClassName("days_names")
    
    //looks for date on html calendar that matches current date and changes class name of that <li> tag to "active". this class has style in the css and will change the color of the <li> tag that has that date in it
    
    for (var i = 0; i < days.length; i++) {
        if (days[i].textContent == date.getDate()) {
            days[i].classList.add('active');
            break;
        }
    }
}

function create_calendar() {
    //first day of current month
    var fst_day = new Date(year, month, 1).getDay();

    //number of days in month
    var days = new Date(year, month, 0).getDate();

    //all the cells in the calender in which the days will go in
    var cells = document.getElementsByClassName("days")[0].children;

    //add days to the cells based on current month
    for (var p = 0; p < days; p++){
        cells[fst_day+p-1].textContent = (p+1).toString();       
    }

    //coloring to calendar
    CurDate();
    
}

/* Work in progress: adding "selected" to category you select 

function add_selected() {
    const selected_element = document.querySelectorAll('ul.cat a');


    selected_element.forEach(Element => addEventListener("click", function() {
        Node.createElement('img');

        const selected_element = document.querySelectorAll('ul.cat a');
        console.log(selected_element);
        let image = document.createElement('img');
        selected_element.appendChild(image);


    }))
} 
*/