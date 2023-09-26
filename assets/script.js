/*
Stavros Panagiotopoulos (stavrospana)
SCS Boot Camp Module 5 Weekly Challenge - Hourly Work Day Scheduler
Created 2023/08/09
Last Edited 2023/09/26
*/
$(document).ready(function() {
    // Function to save user input to local storage
    $(".saveBtn").on("click", function() {
      var timeBlockId = $(this).parent().attr("id"); // Get the id of the time-block
      var description = $(this).siblings(".description").val(); // Get the user input
  
      localStorage.setItem(timeBlockId, description); // Save in local storage
    });
  
    // Function to apply past, present, or future class to time blocks
    function updateHourClasses() {
      var currentHour = dayjs().format("H"); // Get current hour in 24-hour format
  
      $(".time-block").each(function() {
        var blockHour = parseInt($(this).attr("id").split("-")[1]);
  
        if (blockHour < currentHour) {
          $(this).removeClass("present future").addClass("past");
        } else if (blockHour == currentHour) {
          $(this).removeClass("past future").addClass("present");
        } else {
          $(this).removeClass("past present").addClass("future");
        }
      });
    }
  
    // Function to retrieve user input from local storage
    function retrieveUserInput() {
      $(".time-block").each(function() {
        var timeBlockId = $(this).attr("id");
        var savedDescription = localStorage.getItem(timeBlockId);
  
        if (savedDescription !== null) {
          $(this).find(".description").val(savedDescription);
        }
      });
    }
  
    // Display the current date in the header
    $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
  
    // Initialize the application
    updateHourClasses(); // Apply initial time block classes
    retrieveUserInput(); // Retrieve saved user input from local storage
  });