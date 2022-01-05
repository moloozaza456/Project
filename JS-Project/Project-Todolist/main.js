// getting all required elements
const inputBox = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const todoList = document.querySelector('.todolist');
const deleteAllBtn = document.querySelector('.footer button');

inputBox.onkeyup = () => {
	let userData = inputBox.value; //getting user entered value
	if (userData.trim() != 0) { // if user values aren't only spaces 
		addBtn.classList.add("active"); //active the add button 
	} else {
		addBtn.classList.remove("active"); //unactive the remove button 
	}
}

showTasks(); // calling showTasks function refresh data still exists

// if user click on the add button
addBtn.onclick = () => {
	let userData = inputBox.value; //getting user entered value
	let getLocalStorage = localStorage.getItem("New todo"); // getting localstorage
	if (getLocalStorage == null) { // if localStorage is null
		listArr = []; // creating blank array
	} else {
		listArr = JSON.parse(getLocalStorage); // transforming json string into a js object
	}
	listArr.push(userData); // push or adding user data
	localStorage.setItem("New todo", JSON.stringify(listArr)); // transforming js object intp a json string
	showTasks(); // calling showTasks function
	addBtn.classList.remove("active"); // unactive the remove button 
}

// function to add task list inside ul
function showTasks() {
	let getLocalStorage = localStorage.getItem("New todo"); // getting localstorage
	if (getLocalStorage == null) { // if localStorage is null
		listArr = []; // creating blank array
	} else {
		listArr = JSON.parse(getLocalStorage); // transforming json string into a js object
	}

	const pendingNumb = document.querySelector('.pendingNumber');
	pendingNumb.textContent = listArr.length; // passing the length value in pendingNumb

	if(listArr.length > 0){ // if arrat length is greather than 0
		deleteAllBtn.classList.add('active') // active yhe clearall button
	} else {
		deleteAllBtn.classList.remove('active') // unactive yhe clearall button
	}

	let newLiTag = '';
	listArr.forEach((element, index) => {
		newLiTag += `<li> ${element} <span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
	});
	todoList.innerHTML = newLiTag; // adding new li tag inside ul tag
	inputBox.value = ""; // once task added leave the input field blank

}

// delete task function
function deleteTask(index) {
	let getLocalStorage = localStorage.getItem("New todo");
	listArr = JSON.parse(getLocalStorage);
	listArr.splice(index, 1); //delete or remove the particular indexed li
	// after remove the liagin update the local storage
	localStorage.setItem("New todo", JSON.stringify(listArr)); // transforming js object intp a json string
	showTasks(); // calling showTasks function
}

// delete all tasks functions

deleteAllBtn.onclick = () => {
	listArr = []; // empty an array
	// after delete all tasks the liagin update the local storage
	localStorage.setItem("New todo", JSON.stringify(listArr)); // transforming js object intp a json string
	showTasks(); // calling showTasks function
}