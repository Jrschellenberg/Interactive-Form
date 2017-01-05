/**
 * Created by Justin on 1/4/2017.
 */
jQuery(function ($) {

	//Creating textInput element for the other selection
	var textInput = $("<input type='text' placeholder='Your job role'>");
	textInput.hide();
	textInput.insertAfter("#title");

	//Creating the total element for the checkbox Selection.
	//setting the total Amount Selected to 0
	var totalAmountSelected = 0;
	var totalOutput = $("<label>Total : $<span id='totalAmount'>"+totalAmountSelected+"</span></label>");
	$(".activities").append(totalOutput);




	//setting variable for the color select id
	var colorElement = $("#colors-js-puns");
	//hiding the element on page load.
	colorElement.hide();


	$("#title").change(function () {
		var optionSelected = $("#title option:selected").val();
		if (optionSelected == "other") {
			textInput.show();
		}
		else {
			textInput.hide();
		}
	});

	$("#design").change(function () {
		var optionSelected = $("#design option:selected").val();
		$("#color option").css("display","block");
		//console.log(optionSelected);
		if(optionSelected == "js puns"){
			//show the element.
			//Call the setOptions function to set the specified option to default selected
			//as well as pass in the formula to hide the desired options.
			setOptions(4,1,"n+4");
			colorElement.show();
		}
		else if(optionSelected == "heart js"){
			//similar to above setOptions call.
			setOptions(1,4,"-n+3");
			colorElement.show();
		}
		else{
			//hide the color element
			colorElement.hide();
			console.log("other....");
		}
	});

	$(".activities label").change(function(){
		//Splitting the String of the currently clicked label element at the $,
		//limiting to only 2 array values
		var array = $(this).text().split('$', 2);
		//grabbing the second array value, the one that holds the $ integer then parsing
		//the string to an integer to base 10.
		var moneyValue = parseInt(array[1], 10);
		//Setting variable to determine if checkbox is clicked or not.
		var isClicked = $(this).children().is(":checked");

		//checking if clicked, if being clicked add to total, else remove from total.
		if(isClicked){
			totalAmountSelected+= moneyValue;
		}
		else{
			totalAmountSelected-= moneyValue;
		}
		$("#totalAmount").text(totalAmountSelected);
	});



	/*
	A function used to set and remove the attributed selector. As well as setting the
	display of certain options to be hidden, based on the theme selected by the end user.
	firstN: a number for the nth-child selector to remove the selected attribute.
	secondN: a number for the nth-child selector to add the selected attribute to the desired
	option.
	formula: the formula to be inserted into the nth-child psuedo element selector to hide
	the elements desired.
	 */
	function setOptions(firstN, secondN, formula){
		$("#color option:nth-child("+firstN+")").removeAttr("selected");
		$("#color option:nth-child("+secondN+")").attr("selected","selected");
		$("#color option:nth-child("+formula+")").css("display","none");
	}
});