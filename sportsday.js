var event = [];
var house = [];
var gender = [];
var grade = [];
var name = [];
var id = [];
var rank = [];
var points = [];
var headers = [];

var relayData = [[]];
var originalData =[[]];
var totalHousePoint = [[]];
var combinedHousePoint = [];
var houseArray = [[]];


var ribbonWinner;
var gradeChamp;

var gradeChampion12Button;
var gradeChampion11Button;
var gradeChampion10Button;
var gradeChampion9Button;
var gradeChampion8Button;
var gradeChampion7Button;
var gradeChampion6Button;
var pointTotalButton;
var mouseOver;
var mouseOverBig;

// spreadsheet variables
var ttsheet6;
var ttsheet7;
var ttsheet8;
var ttsheet9;
var ttsheet10;
var ttsheet11;
var ttsheet12;
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1CGxETFmlqy4lYYhtWcIMd7COtW9MR11EN0YI47XcvCk/pubhtml';


var sheetdata = [[[]]];

// grade 9 spreadsheet variables
//var sheetninedata = [[]];


// grade 10 spreadsheet variables
//var sheettendata = [[]];


// grade champion variables
// uniquedata[grade][individual student][name,points,gender,house,id];

var uniquenames = [[]];
var uniquepoints = [[]];
var uniquegender = [[]];
var uniquehouse = [[]];
var uniqueid = [[]];


var doonce;


function setup(){  

	createCanvas(1200, 3000);

	// set text properties
	/*
	PFont font;
	font = loadFont("FFScala.ttf"); 
	textFont(font, 18); 
	*/

	gradeChampion12Button = loadImage("images/GradeChampion12Button.png");
	gradeChampion11Button = loadImage("images/GradeChampion11Button.png");
	gradeChampion10Button = loadImage("images/GradeChampion10Button.png");
	gradeChampion9Button = loadImage("images/GradeChampion9Button.png");
	gradeChampion8Button = loadImage("images/GradeChampion8Button.png");
	gradeChampion7Button = loadImage("images/GradeChampion7Button.png");
	gradeChampion6Button = loadImage("images/GradeChampion6Button.png");
	pointTotalButton = loadImage("images/PointTotal.png");

	ribbonWinner = loadImage("images/RibbonWinner.png");
	gradeChamp = loadImage("images/GradeChamp.png");
	mouseOver = loadImage("images/MouseOver.png");
	mouseOverBig = loadImage("images/MouseOverBig.png");


	doonce = 0;

	for (i = 0; i < 7; i++)
	{
		sheetdata[i] = [[]];
	}

	for (i = 0; i < 7; i++)
	{
		uniquenames[i] = [];
		uniquepoints[i] = [];
		uniquegender[i] = [];
		uniquehouse[i] = [];
		uniqueid[i] = [];	
	}

	for (i = 0; i < 12; i++) {
		houseArray[i] = [];
	}

	for (i = 0; i < 12; i++) {
		relayData[i] = [];
		relayData[i][0] = i+6; // grade
	}

	for (i = 0; i < 12; i++) {
		originalData[i] = [];
	}
	for (i = 0; i < 12; i++) {
		totalHousePoint[i] = [];
	}

	init();
}  

function init() {

	ttsheet6 = Tabletop.init( { key: public_spreadsheet_url,
					 callback: loadGrade6,
					 wanted: ["Grade6"],
					  simpleSheet: true } )
	ttsheet7 = Tabletop.init( { key: public_spreadsheet_url,
					 callback: loadGrade7,
					 wanted: ["Grade7"],
					  simpleSheet: true } )
	ttsheet8 = Tabletop.init( { key: public_spreadsheet_url,
					 callback: loadGrade8,
					 wanted: ["Grade8"],
					  simpleSheet: true } )
	ttsheet9 = Tabletop.init( { key: public_spreadsheet_url,
					 callback: loadGrade9,
					 wanted: ["Grade9"],
					  simpleSheet: true } )
	ttsheet10 = Tabletop.init( { key: public_spreadsheet_url,
					 callback: loadGrade10,
					 wanted: ["Grade10"],
					  simpleSheet: true } )
	ttsheet11 = Tabletop.init( { key: public_spreadsheet_url,
					 callback: loadGrade11,
					 wanted: ["Grade11"],
					  simpleSheet: true } )
	ttsheet12 = Tabletop.init( { key: public_spreadsheet_url,
					 callback: loadGrade12,
					 wanted: ["Grade12"],
					  simpleSheet: true } )
	houseSheet = Tabletop.init( {key: public_spreadsheet_url,
					 callback: loadHouseData,
					 wanted: ["House Points"],
					 simpleSheet: true} )
}


//process house data
function loadHouseData(data, tabletop){

	for (i = 0; i < data.length; i++)
	{
		x = data[i];
		var d = [];
		
		console.log(d);
		
		sheetHouseMaxCol = 0;
		for (q in x) {
			fill(255,0,0);
			d[sheetHouseMaxCol] = x[q];
			sheetHouseMaxCol++;
		}
		houseArray[i] = d;
	}
}

/*
function parseHouseData(){
	for(i =0; i<houseArray.length; i++){
		for(j=0; j<houseArray[i].length;i++){
			if(j<4){
				originalData[i][j]=houseArray[i][j];
			}else if(j>=4 && j<7){
				relayData[i][j-3] = houseArray[i][j];
			}else{
				totalHousePoint[i][j-7] = houseArray[i][j];
			}
		}
	}
}

function calculateTotalHousePoint(){
	for(i=0; i<totalHousePoint[0].length; i++){
		for(j=1; j<totalHousePoint.length; j++){
			totalP += totalHousePoint[j][i];
		}
		combinedHousePoint[i] = totalP;
		totalP = 0;
	}
}
*/

function printHouseData(){
	background(255,255,255);
	drawButtons();

	dragontotal = 0; // 7	
	tigertotal = 0; // 8
	phoenixtotal = 0; // 9


	fill(0,0,255);
	text("Dragons",150,75);
	fill(0,0,0);
	text("Tigers",250,75);
	fill(255,0,0);
	text("Phoenix",350,75);
	fill(0,0,0);
	text("Grade 6",50,100);
	text("Grade 7",50,125);
	text("Grade 8",50,150);
	text("Grade 9",50,175);
	text("Grade 10",50,200);
	text("Grade 11",50,225);
	text("Grade 12",50,250);
	text("Total",50,275);


	
	for(i=0; i<houseArray.length; i++){
		for(j=7; j<houseArray[i].length; j++){
			fill(0,0,0);


			if (j == 7)
			{
				fill(0,0,255);
				dragontotal = dragontotal + parseInt(houseArray[i][j]);
				text(houseArray[i][j],(j-5)*100-50,100+i*25);
			}
			if (j == 8)
			{
				fill(0,0,0);
				tigertotal = tigertotal + parseInt(houseArray[i][j]);
				text(houseArray[i][j],(j-5)*100-50,100+i*25);
			}
			if (j == 9)
			{
				fill(255,0,0);
				phoenixtotal = phoenixtotal + parseInt(houseArray[i][j]);
				text(houseArray[i][j],(j-5)*100-50,100+i*25);
			}
		}
	}
	
	fill(0,0,255);
	text(dragontotal,150,275);
	fill(0,0,0);
	text(tigertotal,250,275);
	fill(255,0,0);
	text(phoenixtotal,350,275);
	
	line(42,257,410,257);
	line(42,285,410,285);

	line(42,257,42,285);
	line(120,257,120,285);
	line(215,257,215,285);
	line(310,257,310,285);
	line(410,257,410,285);
}


// process Sheet6 data
function loadGrade6(data, tabletop) {

	for (i = 0; i < data.length; i++)
	{
		x = data[i];
		var d = [];

		sheetninemaxc = 0;
		for (q in x) {
			fill(255,0,0);
			d[sheetninemaxc] = x[q];
			sheetninemaxc++;
		}
		sheetdata[0][i] = d;
	}
}

// process Sheet7 data
function loadGrade7(data, tabletop) {

	for (i = 0; i < data.length; i++)
	{
		x = data[i];
		var d = [];
		
		console.log(x);
		sheetninemaxc = 0;
		for (q in x) {
			fill(255,0,0);
			d[sheetninemaxc] = x[q];
			sheetninemaxc++;
		}
		sheetdata[1][i] = d;
	}
}

// process Sheet8 data
function loadGrade8(data, tabletop) {

	for (i = 0; i < data.length; i++)
	{
		x = data[i];
		var d = [];

		sheettenmaxc = 0;
		for (q in x) {
			fill(255,0,0);
			d[sheettenmaxc] = x[q];
			sheettenmaxc++;
		}
		sheetdata[2][i] = d; 
	}
}


// process Sheet9 data
function loadGrade9(data, tabletop) {

	for (i = 0; i < data.length; i++)
	{
		x = data[i];
		var d = [];

		sheetninemaxc = 0;
		for (q in x) {
			fill(255,0,0);
			d[sheetninemaxc] = x[q];
			sheetninemaxc++;
		}
//		sheetninedata[i] = d;
		sheetdata[3][i] = d;
	}
	
}

// process Sheet10 data
function loadGrade10(data, tabletop) {

	for (i = 0; i < data.length; i++)
	{
		x = data[i];
		var d = [];

		sheettenmaxc = 0;
		for (q in x) {
			fill(255,0,0);
			d[sheettenmaxc] = x[q];
			sheettenmaxc++;
		}
		sheetdata[4][i] = d; 
	}
}


// process Sheet11 data
function loadGrade11(data, tabletop) {

	for (i = 0; i < data.length; i++)
	{
		x = data[i];
		var d = [];

		sheettenmaxc = 0;
		for (q in x) {
			fill(255,0,0);
			d[sheettenmaxc] = x[q];
			sheettenmaxc++;
		}
		sheetdata[5][i] = d; 
	}
}

// process Sheet12 data
function loadGrade12(data, tabletop) {

	for (i = 0; i < data.length; i++)
	{
		x = data[i];
		var d = [];

		sheettenmaxc = 0;
		for (q in x) {
			fill(255,0,0);
			d[sheettenmaxc] = x[q];
			sheettenmaxc++;
		}
		sheetdata[6][i] = d; 
	}
}


function showArray(gradelevel)
{

	background(255,255,255);
	drawButtons();
	fill(0,0,0);
	
	j = 65;
	text("Name",50,j);
	text("Points",300,j);
	text("Gender",400,j);
	text("House",500,j);
	text("ID",600,j);	

	i = 0;
	j = 100;
	while (i < uniquenames[gradelevel].length)
	{

		text(uniquenames[gradelevel][i],50,j);
		text(uniquepoints[gradelevel][i],300,j);
		text(uniquegender[gradelevel][i],400,j);
		text(uniquehouse[gradelevel][i],500,j);
		text(uniqueid[gradelevel][i],600,j);
		i = i + 1;
		j = j + 30;
	}



/*
	i = 0;
	j = 100;
	while (i < sheetdata[gradelevel].length)
	{

		text(sheetdata[gradelevel][i][0],50,j);
		text(sheetdata[gradelevel][i][1],300,j);
		text(sheetdata[gradelevel][i][2],400,j);
		text(sheetdata[gradelevel][i][3],500,j);
		text(sheetdata[gradelevel][i][4],600,j);
		text(sheetdata[gradelevel][i][5],700,j);
		text(sheetdata[gradelevel][i][6],800,j);
		text(sheetdata[gradelevel][i][7],900,j);

		i = i + 1;
		j = j + 50;
	}
	*/
}

// filter top 3 winners for each event and display

function showRibbonWinners(gradelevel)
{
	background(255,255,255);
	drawButtons();
	fill(0,0,0);
	
	j = 65;
	text("Student",50,j);
	text("Place",300,j);
	text("Gender",400,j);
	text("Event",500,j);
	text("ID",600,j);	
	
	
	

	i = 0;
	j = 100;
	while (i < sheetdata[gradelevel].length)
	{
		if (sheetdata[gradelevel][i][5] < 4 && 
		isNaN(parseInt(sheetdata[gradelevel][i][5])) != true) {
		
		
			x = 0;
			while (x < sheetdata[gradelevel].length)
			{
				y = 0;
				while (y < sheetdata[gradelevel].length-1)
				{
					if (sheetdata[gradelevel][y][3] > sheetdata[gradelevel][y+1][3])
					{
						temp = sheetdata[gradelevel][y];
						sheetdata[gradelevel][y] = sheetdata[gradelevel][y+1];
						sheetdata[gradelevel][y+1] = temp;
					}
					y=y+1;
				}
				x=x+1;
			}

			j = j + 25;		


		}

		i = i + 1;
	}

	x = 0;
	while (x < sheetdata[gradelevel].length)
	{
		z = x;
		while (z < sheetdata[gradelevel].length-1 && 
			   sheetdata[gradelevel][z][3] == sheetdata[gradelevel][z+1][3])
		{
			z++;
		}

		y = x;
		while (y < z)
		{
			a = x;
			while (a < z)
			{
				if (sheetdata[gradelevel][a][4] < sheetdata[gradelevel][a+1][4])
				{
					temp = sheetdata[gradelevel][a];
					sheetdata[gradelevel][a] = sheetdata[gradelevel][a+1];
					sheetdata[gradelevel][a+1] = temp;
				}
				a=a+1;
			}
			y=y+1;
		}
		x=x+1;
	}	


	x = 0;
	while (x < sheetdata[gradelevel].length)
	{
		z = x;
		while (z < sheetdata[gradelevel].length-1 && 
			   sheetdata[gradelevel][z][4] == sheetdata[gradelevel][z+1][4])
		{
			z++;
		}

		y = x;
		while (y < z)
		{
			a = x;
			while (a < z)
			{
				if (sheetdata[gradelevel][a][5] > sheetdata[gradelevel][a+1][5])
				{
					temp = sheetdata[gradelevel][a];
					sheetdata[gradelevel][a] = sheetdata[gradelevel][a+1];
					sheetdata[gradelevel][a+1] = temp;
				}
				a=a+1;
			}
			y=y+1;
		}
		x=x+1;
	}

	i = 0;
	j = 100;
	while (i < sheetdata[gradelevel].length)
	{
		if (sheetdata[gradelevel][i][5] < 4 && 
		isNaN(parseInt(sheetdata[gradelevel][i][5])) != true) {
		
		

					text(sheetdata[gradelevel][i][0],50,j);
					text(sheetdata[gradelevel][i][5],300,j);
					text(sheetdata[gradelevel][i][4],400,j);
		//			text(sheetdata[gradelevel][i][2],500,j);
					text(sheetdata[gradelevel][i][1],600,j);
		
					//event
					text(sheetdata[gradelevel][i][3],500,j);
					//points
		// 			text(sheetdata[gradelevel][i][7],700,j);
					//time winner only
		// 			text(sheetdata[gradelevel][i][6],800,j);


			j = j + 25;		


		}

		i = i + 1;
	}



}


function draw()
{
//	background(255,255,255);
	fill(0,0,0);

	drawButtons();
	if (doonce == 0 && sheetdata[0][0][0] != null && 
	    sheetdata[1][0][0] != null &&
	    sheetdata[2][0][0] != null &&
	    sheetdata[3][0][0] != null &&
	    sheetdata[4][0][0] != null &&
	    sheetdata[5][0][0] != null && 
	    sheetdata[6][0][0] != null)
	{
		doonce = 1;
		findGradeChampion(0);
		findGradeChampion(1);
		findGradeChampion(2);
		findGradeChampion(3);
		findGradeChampion(4);
		findGradeChampion(5);
		findGradeChampion(6);
		showArray(6);
	}
	
	
	if (doonce == 1)
	{
		if (mouseIsPressed == true)
		{
			y = 50;
			if (mouseX > 800 && mouseX < 900 && mouseY > 100+y && mouseY < 150+y)
			{
				showArray(6);
			}
			if (mouseX > 800 && mouseX < 900 && mouseY > 150+y && mouseY < 200+y)
			{
				showArray(5);
			}
			if (mouseX > 800 && mouseX < 900 && mouseY > 200+y && mouseY < 250+y)
			{
				showArray(4);
			}
			if (mouseX > 800 && mouseX < 900 && mouseY > 250+y && mouseY < 300+y)
			{
				showArray(3);
			}
			if (mouseX > 800 && mouseX < 900 && mouseY > 300+y && mouseY < 350+y)
			{
				showArray(2);
			}
			if (mouseX > 800 && mouseX < 900 && mouseY > 350+y && mouseY < 400+y)
			{
				showArray(1);
			}
			if (mouseX > 800 && mouseX < 900 && mouseY > 400+y && mouseY < 450+y)
			{
				showArray(0);
			}
			if (mouseX > 800 && mouseX < 1000 && mouseY > 50 && mouseY < 100)
			{
				printHouseData();
			}
			if (mouseX > 900 && mouseX < 1000 && mouseY > 100+y && mouseY < 150+y)
			{
				showRibbonWinners(6);
			}
			if (mouseX > 900 && mouseX < 1000 && mouseY > 150+y && mouseY < 200+y)
			{
				showRibbonWinners(5);
			}
			if (mouseX > 900 && mouseX < 1000 && mouseY > 200+y && mouseY < 250+y)
			{
				showRibbonWinners(4);
			}
			if (mouseX > 900 && mouseX < 1000 && mouseY > 250+y && mouseY < 300+y)
			{
				showRibbonWinners(3);
			}
			if (mouseX > 900 && mouseX < 1000 && mouseY > 300+y && mouseY < 350+y)
			{
				showRibbonWinners(2);
			}
			if (mouseX > 900 && mouseX < 1000 && mouseY > 350+y && mouseY < 400+y)
			{
				showRibbonWinners(1);
			}
			if (mouseX > 900 && mouseX < 1000 && mouseY > 400+y && mouseY < 450+y)
			{
				showRibbonWinners(0);
			}
		}
	}
	
}

function drawButtons()
{
	y = 150;
	image(gradeChampion12Button,800,y);
	image(gradeChampion11Button,800,y+50);
	image(gradeChampion10Button,800,y+100);
	image(gradeChampion9Button,800,y+150);
	image(gradeChampion8Button,800,y+200);
	image(gradeChampion7Button,800,y+250);
	image(gradeChampion6Button,800,y+300);

	image(gradeChampion12Button,910,y);
	image(gradeChampion11Button,910,y+50);
	image(gradeChampion10Button,910,y+100);
	image(gradeChampion9Button,910,y+150);
	image(gradeChampion8Button,910,y+200);
	image(gradeChampion7Button,910,y+250);
	image(gradeChampion6Button,910,y+300);

	image(pointTotalButton,800,50);

	image(ribbonWinner,910,100);
	image(gradeChamp,800,100);
	
	y = 50;
	if (mouseX > 800 && mouseX < 900 && mouseY > 100+y && mouseY < 150+y)
	{
		image(mouseOver,800,y+100);
	}
	if (mouseX > 800 && mouseX < 900 && mouseY > 150+y && mouseY < 200+y)
	{
		image(mouseOver,800,y+150);
	}
	if (mouseX > 800 && mouseX < 900 && mouseY > 200+y && mouseY < 250+y)
	{
		image(mouseOver,800,y+200);
	}
	if (mouseX > 800 && mouseX < 900 && mouseY > 250+y && mouseY < 300+y)
	{
		image(mouseOver,800,y+250);
	}
	if (mouseX > 800 && mouseX < 900 && mouseY > 300+y && mouseY < 350+y)
	{
		image(mouseOver,800,y+300);
	}
	if (mouseX > 800 && mouseX < 900 && mouseY > 350+y && mouseY < 400+y)
	{
		image(mouseOver,800,y+350);
	}
	if (mouseX > 800 && mouseX < 900 && mouseY > 400+y && mouseY < 450+y)
	{
		image(mouseOver,800,y+400);
	}
	if (mouseX > 800 && mouseX < 1000 && mouseY > 50 && mouseY < 100)
	{
		image(mouseOverBig,800,50);
	}
	if (mouseX > 900 && mouseX < 1000 && mouseY > 100+y && mouseY < 150+y)
	{
		image(mouseOver,910,y+100);
	}
	if (mouseX > 900 && mouseX < 1000 && mouseY > 150+y && mouseY < 200+y)
	{
		image(mouseOver,910,y+150);
	}
	if (mouseX > 900 && mouseX < 1000 && mouseY > 200+y && mouseY < 250+y)
	{
		image(mouseOver,910,y+200);
	}
	if (mouseX > 900 && mouseX < 1000 && mouseY > 250+y && mouseY < 300+y)
	{
		image(mouseOver,910,y+250);
	}
	if (mouseX > 900 && mouseX < 1000 && mouseY > 300+y && mouseY < 350+y)
	{
		image(mouseOver,910,y+300);
	}
	if (mouseX > 900 && mouseX < 1000 && mouseY > 350+y && mouseY < 400+y)
	{
		image(mouseOver,910,y+350);
	}
	if (mouseX > 900 && mouseX < 1000 && mouseY > 400+y && mouseY < 450+y)
	{
		image(mouseOver,910,y+400);
	}
}


function findGradeChampion(gradelevel)
{
	// bubblesort ID first
	i = 0;
	

	while (i < sheetdata[gradelevel].length)
	{
		j = 0;
		while (j < sheetdata[gradelevel].length-1)
		{
			if (isNaN(parseInt(sheetdata[gradelevel][j+1][1])) || 
				parseInt(sheetdata[gradelevel][j][1]) < parseInt(sheetdata[gradelevel][j+1][1])
			    )
			    
			{
				temp = sheetdata[gradelevel][j];
				sheetdata[gradelevel][j] = sheetdata[gradelevel][j+1];
				sheetdata[gradelevel][j+1] = temp;
			}
			j++;
		}
		i++;
	}	
	

//	text("The following are the grade level champions",25,50);

	// add all unique names into point total
	
	
	i = 0;
	count = 0;
	total = 0;

	while(i < sheetdata[gradelevel].length-1)
	{
		previous = sheetdata[gradelevel][i][1];
		current = sheetdata[gradelevel][i+1][1];


		if (isNaN(parseInt(sheetdata[gradelevel][i][7])) == false)
		{
			total = total + parseInt(sheetdata[gradelevel][i][7]);
		}
		if(parseInt(current) != parseInt(previous))
		{
			// unique arrays 0 - grade 9
			uniquenames[gradelevel][count] = sheetdata[gradelevel][i][0];
			uniquepoints[gradelevel][count] = total;
			uniquegender[gradelevel][count] = sheetdata[gradelevel][i][4];
			uniquehouse[gradelevel][count] = sheetdata[gradelevel][i][2];
			uniqueid[gradelevel][count] = sheetdata[gradelevel][i][1];


			total = 0;
			count++;
		}
		i = i + 1;
	}
	
	// bubblesort
	

	i = 0;
	while (i < uniquepoints[gradelevel].length)
	{
		j = 0;
		while (j < uniquepoints[gradelevel].length-1)
		{
			if (uniquepoints[gradelevel][j] < uniquepoints[gradelevel][j+1])
			{
				temp = uniquepoints[gradelevel][j];
				uniquepoints[gradelevel][j] = uniquepoints[gradelevel][j+1];
				uniquepoints[gradelevel][j+1] = temp;

				temp = uniquenames[gradelevel][j];
				uniquenames[gradelevel][j] = uniquenames[gradelevel][j+1];
				uniquenames[gradelevel][j+1] = temp;

				temp = uniquegender[gradelevel][j];
				uniquegender[gradelevel][j] = uniquegender[gradelevel][j+1];
				uniquegender[gradelevel][j+1] = temp;

				temp = uniquehouse[gradelevel][j];
				uniquehouse[gradelevel][j] = uniquehouse[gradelevel][j+1];
				uniquehouse[gradelevel][j+1] = temp;

				temp = uniqueid[gradelevel][j];
				uniqueid[gradelevel][j] = uniqueid[gradelevel][j+1];
				uniqueid[gradelevel][j+1] = temp;
			}
			j=j+1;
		}
		i=i+1;
	}

}

function mouseClicked()
{

}