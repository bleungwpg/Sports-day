var singlePrime;
var randomIndex;
var thimble;
var uniqueOn;
var markUniqueStudent;
var currentGrade;
var formData;
var ipad;
var eventUse;
var shotputTextbox;


function setup(){
	//create a drawing service 500px wide, 500px tall
	createCanvas(1053,1505);

	ipad = true;
	thimble = false;
	testing = true;
	dataSubmitted = false;
	uniqueOn = false;
	singlePrime = false;
	reset = false;
	first = true;
	once = true;
	currentGrade = 6;
	lock = false;
	eventUse = "ribbons";

	// load up all textboxes and buttons in the interface
	urlinp = createInput();
	urlinp.position(10,40);
	urlinp.size(300,25);  
	submitbutton = createButton('submit');
	submitbutton.position(400, 105);
	submitbutton.mousePressed(pullData);
	
	/*
	checkbox = createCheckbox();
	if (thimble == true)
	{
		checkbox.position(18,92);
	}
	else
	{
		checkbox.position(15,490);
	}
	checkbox.changed(checkUniqueMode);
	checkbox.hide();
	*/

	
	if (testing == true)
	{
		wholehyperlink = "https://docs.google.com/spreadsheets/d/1CGxETFmlqy4lYYhtWcIMd7COtW9MR11EN0YI47XcvCk/edit#gid=1021250630";
		
		startID = wholehyperlink.search("spreadsheets/d/");
		spreadsheetID = wholehyperlink.substring(startID+15,startID+65);
		spreadsheetID = spreadsheetID.substring(0,spreadsheetID.indexOf("/"));
	
		startID = wholehyperlink.search("gid=");
		sheetID = wholehyperlink.substring(startID+4,wholehyperlink.length);


		// update notes: https://docs.google.com/spreadsheets/d/{SHEETID}/gviz/tq?sheet={SHEET NAME}&tq=SELECT*
//		var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1CGxETFmlqy4lYYhtWcIMd7COtW9MR11EN0YI47XcvCk/gviz/tq?sheet=Grade6&tq=SELECT*');
		var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade6'+'&tq=SELECT*');

		query.send(handleQueryResponse);
	}
}

function draw(){

	if (testing == true && dataSubmitted == true)
	{
		urlinp.hide();
		submitbutton.hide();
	}
	
	if (dataSubmitted == true)
	{
		if (eventUse == "ribbons")
		{
			showRibbonData();
		}
		else if (eventUse == "shotput")
		{
			showShotputData();
		}
	}
	else
	{
		background(255,255,255);
		// Prompt to enter your spreadsheet URL
		fill(0,0,0);
		if (thimble == true)
		{
			text("Enter your spreadsheet URL",10,13);
		}
		else
		{
			text("Enter your spreadsheet URL",10,33);
		}

		if (testing == true)
		{
			text("URL: "+wholehyperlink,10,300);
			text("spreadsheetID: "+spreadsheetID,10,325);
			text("sheetID: "+sheetID,10,350);
		}
	}
}

function setupShotput()
{

	var textboxH = 23;
	var textboxHGap = 2;
	shotputTextbox = new Array(shotputRows);

	for (var i = 0; i < shotputRows; i++)
	{
		shotputTextbox[i] = createInput();
  		shotputTextbox[i].position(600,i*textboxH+i*textboxHGap+34);
  		shotputTextbox[i].size(100,textboxH);
	}
}

// Create buttons from grades 6 - 12
function drawButtons()
{
	buttonGap = 60;

	for (var b = 0; b < 7; b++)
	{
		if (currentGrade-6 == b)
		{
			fill(0,255,0);		
		}
		else
		{
			fill(255,255,255);
		}
		rect(10,10+buttonGap*b,100,50);
		fill(0,0,0);
		text("Grade "+(b+6),34,39+buttonGap*b);
		
		if (ipad == true)
		{
			if (mouseX > 10 && mouseX < 10+100 &&
			    mouseY > 10+buttonGap*b && mouseY < 10+buttonGap*b+50)
			{
				currentGrade = b+6;
				var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade'+currentGrade+'&tq=SELECT*');

				query.send(handleQueryResponse);
			}
		}
		else
		{
			if (mouseIsPressed && mouseX > 10 && mouseX < 10+100 &&
			    mouseY > 10+buttonGap*b && mouseY < 10+buttonGap*b+50)
			{
				currentGrade = b+6;
				var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade'+currentGrade+'&tq=SELECT*');

				query.send(handleQueryResponse);
			}
		}
	}
	
	if (eventUse == "ribbons")
	{
		fill(255,255,0);
	}
	else
	{
		fill(255,255,255);	
	}
	
	rect(10,10+buttonGap*8,100,50);
	fill(0,0,0);
	text("Ribbons",34,39+buttonGap*8);

	if (ipad == true)
	{
		if (mouseX > 10 && mouseX < 10+100 &&
			mouseY > 10+buttonGap*8 && mouseY < 10+buttonGap*8+50)
		{
			eventUse = "ribbons";
		}
	}
	else
	{
		if (mouseIsPressed && mouseX > 10 && mouseX < 10+100 &&
			mouseY > 10+buttonGap*8 && mouseY < 10+buttonGap*8+50)
		{
			eventUse = "ribbons";
		}
	}


	if (eventUse == "shotput")
	{
		fill(255,255,0);
	}
	else
	{
		fill(255,255,255);	
	}
	
	rect(10,10+buttonGap*9,100,50);
	fill(0,0,0);
	text("Shotput",34,39+buttonGap*9);

	if (ipad == true)
	{
		if (mouseX > 10 && mouseX < 10+100 &&
			mouseY > 10+buttonGap*9 && mouseY < 10+buttonGap*9+50)
		{
			setupShotput();
			eventUse = "shotput";
		}
	}
	else
	{
		if (mouseIsPressed && mouseX > 10 && mouseX < 10+100 &&
			mouseY > 10+buttonGap*9 && mouseY < 10+buttonGap*9+50)
		{
			setupShotput();
			eventUse = "shotput";
		}
	}


}

function showShotputData()
{
	background(0,0,0);
	
	// draw button
	drawButtons();

	// show data
	col1 = 25;
	col2 = 170;
	col3 = 250;
	col4 = 340;
	col5 = 410;

	fill(255,255,255);
	moreH = 125;
	text("Name",col1+moreH,25);
	text("Student ID",col2+moreH,25);
	text("House",col3+moreH,25);
	text("Event",col4+moreH,25);
	text("Gender",col5+moreH,25);


	for (var r = 0; r < shotputRows; r++)
	{
		hoverOverGapSize = 8;
		// highlight where the mouse hovering over with a green background
		if (mouseY > (r)*continuousGapSize+startGapSize+hoverOverGapSize && 
		    mouseY < (r+1)*continuousGapSize+startGapSize+hoverOverGapSize && mouseX > 140 && mouseX < 140+580)
		{
			fill(0,255,50);
			rect(140,(r)*continuousGapSize+startGapSize+hoverOverGapSize,580,25);
			fill(0,0,0);
			
			// if mouse is pressed toggle the status
			if (ipad == true)
			{
				if (lock == false)
				{
					if (shotputdata[r][8] == 1)
					{
						shotputdata[r][8] = 2;
						lock = true;
					}
					else
					{
						shotputdata[r][8] = 1;
						lock = true;
					}
				
					// start - submit the data back to the spreadsheet
					formData = new FormData();
					formData.append("Sheet Name","Grade"+currentGrade);
					formData.append("Student ID",shotputdata[r][1]);
					formData.append("Event",shotputdata[r][3]);
					formData.append("Ribbon Status",shotputdata[r][8]);

					var request = new XMLHttpRequest();

					// MARK - MUST CHANGE 2
					request.open("POST", "https://script.google.com/macros/s/AKfycbwoePIQmE3KMtgAlzcyh93OHSDZhJPlyvl_4T7jAp2Zfb-qmmY/exec");
					request.send(formData);
					// end - submit data back to the spreadsheet
				}			
			}
			else
			{
				if (mouseIsPressed && lock == false)
				{
					if (shotputdata[r][8] == 1)
					{
						shotputdata[r][8] = 2;
						lock = true;
					}
					else
					{
						shotputdata[r][8] = 1;
						lock = true;
					}
				
					// start - submit the data back to the spreadsheet
					formData = new FormData();
					formData.append("Sheet Name","Grade"+currentGrade);
					formData.append("Student ID",shotputdata[r][1]);
					formData.append("Event",shotputdata[r][3]);
					formData.append("Ribbon Status",shotputdata[r][8]);

					var request = new XMLHttpRequest();

					// MARK - MUST CHANGE 2
					request.open("POST", "https://script.google.com/macros/s/AKfycbwoePIQmE3KMtgAlzcyh93OHSDZhJPlyvl_4T7jAp2Zfb-qmmY/exec");
					request.send(formData);
					// end - submit data back to the spreadsheet
				}			
			}
		}
		else
		{
			fill(255,255,255);
		}


		// populate data
		for (var c = 0; c < maxCols; c++)
		{
			if (c == 0)
			{
				text(shotputdata[r][c],col1+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			if (c == 1)
			{
				text(shotputdata[r][c],col2+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			if (c == 2)
			{
				text(shotputdata[r][c],col3+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			if (c == 3)
			{
				text(shotputdata[r][c],col4+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			if (c == 4)
			{
				text(shotputdata[r][c],col5+moreH,(r+1)*continuousGapSize+startGapSize);
			}
		}
	}


}

function showRibbonData()
{
	background(0,0,0);
	
	// draw button
	drawButtons();

	
	// show checkbox
	/*
	checkbox.show();
	fill(255,255,255);
	text("Unique mode",32,504);
	*/

	// show data
	col1 = 25;
	col2 = 170;
	col3 = 250;
	col4 = 340;
	col5 = 410;
	col6 = 490;
	col7 = 550;

	fill(255,255,255);
	moreH = 125;
	text("Name",col1+moreH,25);
	text("Student ID",col2+moreH,25);
	text("House",col3+moreH,25);
	text("Event",col4+moreH,25);
	text("Gender",col5+moreH,25);
	text("Place",col6+moreH,25);
	text("Ribbon",col7+moreH,25);


	for (var r = 0; r < ribbonRows; r++)
	{
		hoverOverGapSize = 8;
		// highlight where the mouse hovering over with a green background
		if (mouseY > (r)*continuousGapSize+startGapSize+hoverOverGapSize && 
		    mouseY < (r+1)*continuousGapSize+startGapSize+hoverOverGapSize && mouseX > 140 && mouseX < 140+580)
		{
			fill(0,255,50);
			rect(140,(r)*continuousGapSize+startGapSize+hoverOverGapSize,580,25);
			fill(0,0,0);
			
			// if mouse is pressed toggle the status
			if (ipad == true)
			{
				if (lock == false)
				{
					if (ribbondata[r][8] == 1)
					{
						ribbondata[r][8] = 2;
						lock = true;
					}
					else
					{
						ribbondata[r][8] = 1;
						lock = true;
					}
				
					// start - submit the data back to the spreadsheet
					formData = new FormData();
					formData.append("Sheet Name","Grade"+currentGrade);
					formData.append("Student ID",ribbondata[r][1]);
					formData.append("Event",ribbondata[r][3]);
					formData.append("Ribbon Status",ribbondata[r][8]);

					var request = new XMLHttpRequest();

					// MARK - MUST CHANGE 2
					request.open("POST", "https://script.google.com/macros/s/AKfycbwoePIQmE3KMtgAlzcyh93OHSDZhJPlyvl_4T7jAp2Zfb-qmmY/exec");
					request.send(formData);
					// end - submit data back to the spreadsheet
				}			
			}
			else
			{
				if (mouseIsPressed && lock == false)
				{
					if (ribbondata[r][8] == 1)
					{
						ribbondata[r][8] = 2;
						lock = true;
					}
					else
					{
						ribbondata[r][8] = 1;
						lock = true;
					}
				
					// start - submit the data back to the spreadsheet
					formData = new FormData();
					formData.append("Sheet Name","Grade"+currentGrade);
					formData.append("Student ID",ribbondata[r][1]);
					formData.append("Event",ribbondata[r][3]);
					formData.append("Ribbon Status",ribbondata[r][8]);

					var request = new XMLHttpRequest();

					// MARK - MUST CHANGE 2
					request.open("POST", "https://script.google.com/macros/s/AKfycbwoePIQmE3KMtgAlzcyh93OHSDZhJPlyvl_4T7jAp2Zfb-qmmY/exec");
					request.send(formData);
					// end - submit data back to the spreadsheet
				}			
			}
		}
		else
		{
			fill(255,255,255);
		}


		// populate data
		for (var c = 0; c < maxCols; c++)
		{
			if (c == 0)
			{
				text(ribbondata[r][c],col1+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			if (c == 1)
			{
				text(ribbondata[r][c],col2+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			if (c == 2)
			{
				text(ribbondata[r][c],col3+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			if (c == 3)
			{
				text(ribbondata[r][c],col4+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			if (c == 4)
			{
				text(ribbondata[r][c],col5+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			if (c == 5)
			{
				text(ribbondata[r][c],col6+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			if (c == 8)
			{
				if (ribbondata[r][c] == 1)
				{
					text("Earned",col7+moreH,(r+1)*continuousGapSize+startGapSize);
				}
				else if (ribbondata[r][c] == 2)
				{
					text("Given",col7+moreH,(r+1)*continuousGapSize+startGapSize);
				}
			}
		}
	}

}

function checkUniqueMode() {
	if (this.checked()) {
		markUniqueStudent = new Array(maxRows);
		for (var i = 0; i < maxRows; i++)
		{
			markUniqueStudent[i] = 0;
		}
		uniqueOn = true;
		first = true;
		console.log("Checking!");
	}
	else {
		uniqueOn = false;
		first = true;
		console.log("Unchecking!");
	}
}

function mouseReleased()
{
	lock = false;
}