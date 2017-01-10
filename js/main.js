/**
 * Created by Justin on 1/4/2017.
 * using the Jquery plugin Form validator from http://www.formvalidator.net/index.html
 */
jQuery(function ($) {


	//Code for custom function for jquery validator
	$.formUtils.addValidator({
		name : 'checkboxes',
		validatorFunction : function(value, $el, config, language, $form) {
			return $('input[type="checkbox"]:checked').length > 0; //Making sure at least one checkbox is selected.
		},
		errorMessage : 'You need to select at least one checkbox',
		errorMessageKey: 'uncheckedBox'
	});

	//Adding the security module from the plugin for credit card verification.
	$.validate({
		modules : 'security', //Adding the module for creditcard Validation
		validateOnBlur : true, // disable validation when input looses focus
		errorMessagePosition : 'top', // Instead of 'inline' which is default
		scrollToTopOnError : true, // Set this property to true on longer forms

	});

	//Creating textInput element for the other selection
	var textInput = $("<input type='text' placeholder='Your job role'>");
	textInput.hide();
	textInput.insertAfter("#title");

	//Creating the total element for the checkbox Selection.
	//setting the total Amount Selected to 0
	var totalAmountSelected = 0;
	var totalOutput = $("<label>Total : $<span id='totalAmount'>"+totalAmountSelected+"</span></label>");
	$(".activities").append(totalOutput);


	//Putting the payment options into an array to be used with the hideshowOptions function.
	var paymentArray = [];
	paymentArray[0] = $("#credit-card");
	paymentArray[1] = $("#credit-card").next();
	paymentArray[2] = $("#credit-card").next().next();

	//Hiding all payment options on page load.
	hideShowOptions(paymentArray, -1);

	//setting variable for the color select id
	var colorElement = $("#colors-js-puns");
	//hiding the color select box on page load.
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
		//making variable of the option selected on change.
		var optionSelected = $("#design option:selected").val();
		$("#color option").css("display","block");
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
		}
	});


	//Called when someone makes a change with the select payment element with id of #payment
	$("#payment").change(function(){
		//Grabs the current option selected
		var optionSelected = $("#payment option:selected").val();

		//Logic to test which options to show, and which to hide.
		if(optionSelected == "credit card"){
			hideShowOptions(paymentArray, 0);
		}
		else if(optionSelected == "paypal"){
			hideShowOptions(paymentArray, 1);
		}
		else if(optionSelected == "bitcoin"){
			hideShowOptions(paymentArray, 2);
		}
		else{
			//if the 3 options aren't selected. Hide all options.
			hideShowOptions(paymentArray, -1);
		}
	});

	//Called when detecting a change for any of the activities checkboxes
	$(".activities label").change(function(){
		//Grab the string of text of the current label of checkbox checked.
		var str = $(this).text();
		//Calling the function getSubString to process the string into a substring containing the time if it exists.
		var timeString = getSubString(str);

		if($(this).children().is(":checked"))
		{
			//Calling the function enableDisableCheckboxes, see below (function is a nested function!)
			enableDisableCheckboxes(true);
		}else{
			enableDisableCheckboxes(false);
		}


		/*
		The block of code Below here in this change function is used to make a running total of
		 the cost of activities
		 */

		//Splitting the String of the currently clicked label element at the $,
		//limiting to only 2 array values
		var moneyArray = $(this).text().split('$', 2);
		//grabbing the second array value, the one that holds the $ integer then parsing
		//the string to an integer to base 10.
		var moneyValue = parseInt(moneyArray[1], 10);
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

		/*
		 A function to give checkboxes the disabled or enabled attribute based on the
		 time contained within their string
		 disableBox, Boolean: if true will disable the boxes, if false will disable the boxes.
		 */
		function enableDisableCheckboxes(disableBox){
			$(".activities input[type=checkbox]").each(function () {
				var isChecked = $(this).is(":checked");
				var str = $(this).closest("label").text();
				var comparedTimeString = getSubString(str);
				if (!isChecked) {
					if (comparedTimeString == timeString) {
						$(this).prop("disabled", disableBox);
					}
				}
			});
		}
	});

	/*
	A function used to get the substring of text, gets the substring contained between — and ,
	str: the input string to grab the substring of.
	 */
	function getSubString(str){
		return str.substring(str.lastIndexOf("— ")+1, str.lastIndexOf(","));
	}

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

	/*
	A function to hide and show elements of an array
	array:an array of dom elements to hide or show
	showIndex, the index of the array, used to select which element of the array to show. rest become hidden.
	 */
	function hideShowOptions(array, showIndex){
		for(var i=0; i<array.length; i++){
			if(i==showIndex){
				array[i].show();
			}
			else{
				array[i].hide();
			}
		}
	}
});