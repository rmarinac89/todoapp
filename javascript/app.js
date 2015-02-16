
var taskInput = document.getElementById("new-task"); //new task
var addButton = document.getElementsByTagName("button")[0]; //first-button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //the ul with the id of #incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//New task list item
var createNewTaskElement = function(taskString) {
	
	var listItem = document.createElement("li");
			///input (checkbox)


	var checkBox = document.createElement("input");
		//label
	var label = document.createElement("label");
		//input (text)
	var editInput = document.createElement("input");
		//button.edit
	var editButton = document.createElement("button");
		//button.delete
	var deleteButton = document.createElement("button");


		//each elements, needs modified and appended

		checkBox.type = "checkbox";
		editInput.type = "text";

		editButton.innerText = "Edit";
		editButton.className = "edit";
		deleteButton.innerText = "Delete";
		deleteButton.className = "delete";
		label.innerText = taskString;



	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	

		return listItem;

}


//Add a new task
var addTask = function() { 
	console.log("Add task...");
		//create a new list item with the text from #new-task
	var listItem = createNewTaskElement(taskInput.value);
		//append list item to incompleteTaskHolder
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
	taskInput.value = "";

}

//edit an existing task
var editTask = function() {
	console.log("Edit task...");

	var listItem = this.parentNode;

	var editInput = listItem.querySelector("input[type=text]");
	var label = listItem.querySelector("label");

	var containsClass = listItem.classList.contains('editMode');

	if(containsClass) {
		//If the parent has the class .editMode, we want to switch from .editMode and make the label text become the input's value.
		label.innerText = editInput.value;
	}
	
	else {
		//Switch to .editMode
		//Input value becomes the label's text.
		editInput.value = label.innerText;
	}
		
	listItem.classList.toggle("editMode");
	//Toggle .editMode on the listitem.
}


//Delete an existing task
var deleteTask = function() {
	console.log("delete task...");
	var listItem = this.parentNode;
	var ul = listItem.parentNode; 
		//Remove the parent list item from the ul
	ul.removeChild(listItem);
}

//Mark a task as complete
var taskCompleted = function() { 
	console.log("Task complete...");
	//Append the task list item to the #completed-tasks
	var listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);

}


//Mark a task as incomplete
var taskIncomplete = function() {
	console.log("Task incomplete...");
	//Append the task list item to the #incomplete-tasks
	var listItem = this.parentNode;
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

}

var ajaxRequest = function() {
	console.log("AjAX request");
}

//Set the click handler to the AddTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);



var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
	console.log("Bind list item events");
			//select taskListItem children
	var checkbox = taskListItem.querySelector("input[type=checkbox]");
	var editButton = taskListItem.querySelector("button.edit");
	var deleteButton = taskListItem.querySelector("button.delete");			
		//bind the editTask to edit button
		editButton.onclick = editTask;
		//bind deleteTask to the delete button
		deleteButton.onclick = deleteTask;
		//bind checkBoxEventHandler to the checkbox
		checkbox.onchange = checkBoxEventHandler;

}

//cycle over incompleteTasksHolder ul list items

for(var i=0; i<incompleteTasksHolder.children.length; i++) {
	//bind events to list items children (TaskCompleted)
	bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);

}
	

//cycle over completedTasksHolder ul list items
for(var i=0; i<completedTasksHolder.children.length; i++) {
	//bind events to list items children (TaskIncomplete)
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);

}

	

































