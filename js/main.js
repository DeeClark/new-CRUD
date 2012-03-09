


// wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function(){


	//getElementById function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	//create select field element and populate with options.
	function makeCats(){
		var formTag = document.getElementsByTagName("form"),//form tag is an array
			selectLi = $('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id","group");
		for(var i=0,j=make.lenth; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = make[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	//Should have asked if this is needed twice.
	function getSelectedRadio(){
		var radio = document.forms[0].mech;
		for(var i=0; i<radio.lenth; i++){
			if(radio[i].checked){
				mechValue = radio[i].value;
			}
		}
	};
	
	function getCheckboxValue(){
		if($('save').checked){
			saveValue = $('save').value;
			}else{
				saveValue = "No"
			}
		}	
		
		
	function toggleControls(n){
        switch(n){
            case "on":
                $('events').style.display = "none";
                $('clear').style.display = "inline";
                $('display').style.display = "none";
                $('submit').style.display = "inline";
                break;
            case "off":
                $('events').style.display = "block";
                $('clear').style.display = "inline";
                $('display').style.display = "inline";
                $('submit').style.display = "none";
                $('items').style.display = "none";
                break;
            default:
                return false;
        }
    }
	
	function storeData(){
		var id  	= Math.floor(Math.random()*10000001);
		getSelectedRadio();
		getCheckboxValue();
		
		//gather up all our form field values and store in an object.
		//Object properties contain array with the form label and input value.
		var item  	= {};
			item.group	=["Make:", $('group').value];//this needs to be created
			item.auto	=["Vehicle:", $('auto').value];
			item.miles	=["Mileage:", $('miles').value];
			
			item.save	=["Save vehicle?:", saveValue];
			item.mech	=["Is this mechanical?  :", mechValue];
			/*
			item		=[" Repeat service:", $('no').value];//stuck and should have asked question. 
			item	 	=["  :", $('yea').value];
			item	    =["  :", $('nea').value];
			*/
			item.what	=["What happened?", $('what').value];
			
			//save to local storage-convert to string with Stringify
			localStorage.setItem(id, JSON.stringify(item));
			alert("Event Recorded!");
	}
	function getData(){
		toggleControls("on");
		if (localStorage.lenth === 0){
			alert("No history to display. Defaults added");
			autoAddData();
		}
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = document.createElement('li');
			//week 3
			var linksLi = document.createElement('li');
			
			//week 3
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
		//	getImage(obj.make[0]makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+""+obj[n][1];
				makeSubli.innerHTML = optSubText;
	//week 3
				makeSubList.appendChild(linksLi);
				
			}
			makeItemLinks(localStorage.key(i),linksLi);//create links/button in local storage
			
			
		}
		
	}
	//
	function getImage(makName){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImage = document.createElement('img');
		var setSrc = newImage.setAttribute('src','images/'+ makName +'.png');
		imageLi.appendChild(newImage)
	
	}
	
	function autoAddData(){
		for(var n in json){
			var id =  Math.floor(Math.random()*10000001);
			localStorage.setItem(id, JSON.stringify(json[n]))
		}
	
	
	}
	
	function makeItemLinks(key, linksLi){
		//add edit each link
		var editLink = document.createElement('a');
	 editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Event";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		vardeleteText = "Delete Event";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	
	}
	function editItem(){
		//get data from local storage
		var value = localStorage.getItem(this.key);
		var item =JSON.parse(value);
		
		toggleControls("off");
		
		$('make').value = item.make[1];
		$('auto').value = item.auto[1];
		$('miles').value = item.miles[1];
		$('save').value = item.save[1];
		//radio buttons will not work.  must re watch week 3 vid js.3
		$('yes').value = item.mech[1];
		$('what').value = item.what[1];
		
		//remove the initial listener
		save.removeEventListener("click", storeData);
		$('submit').value = "edit event";
		var editSubmit = $('submit');
		editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;

	}	
	//week 3

	function clearLocal(){
		if(localStorage.lenth === 0){
			alert("No events to delete.")
		}else{
			localStorage.clear();
			alert("Events deleted.");
			window.location.reload();
			return false;
		}
	}
	
	function validate(){
	
	}
	//variable defaults
		
	var  make = ["--Vehicles--","Chevy","Ford","GM","Other"],
		saveValue = "No",
		mechValue
	;	
	makeCats();


	//set link & submit click events
	var displayLink =$('display');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	
	var save = $('submit');
	save.addEventListener("click", storeData);

});