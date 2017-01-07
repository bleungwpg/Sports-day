google.load("visualization", "1", {packages:["corechart"]});

var alldata = [[]];
var ribbondata = [[]];
var eventData = [[[]]];
var maxRows;
var maxCols;
var ribbonRows;
var eventRows = [];
var inp;
var startGapSize = 25;
var continuousGapSize = 25;
var spreadsheetID;
var sheetID;
var wholehyperlink;
var testing;
var dataSubmitted;




function showData()
{

      background(0,0,0);
	  fill(255,255,255);
	  
	  moreH = 125;
	  
      text("Student ID",25+moreH,25);
      text("Last Name",100+moreH,25);
      text("First Name",200+moreH,25);

      for (var r = 0; r < maxRows; r++)
      {
        text(r,370+moreH,(r+1)*continuousGapSize+startGapSize);
        for (var c = 0; c < maxCols; c++)
        {
          if (c == 0)
          {
            text(alldata[r][c],25+moreH,(r+1)*continuousGapSize+startGapSize);
          }
          if (c == 1)
          {
            text(alldata[r][c],100+moreH,(r+1)*continuousGapSize+startGapSize);
          }
          if (c == 2)
          {
            text(alldata[r][c],200+moreH,(r+1)*continuousGapSize+startGapSize);
          }
        }
      }

}


function pullData()
{
	// parse sheet ID and tab ID
	wholehyperlink = urlinp.value();
	startID = wholehyperlink.search("spreadsheets/d/");
	spreadsheetID = wholehyperlink.substring(startID+15,startID+65);
	spreadsheetID = spreadsheetID.substring(0,spreadsheetID.indexOf("/"));
	
	startID = wholehyperlink.search("gid=");
	sheetID = wholehyperlink.substring(startID+4,wholehyperlink.length);

	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade6'+'&tq=SELECT*');
//	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1CGxETFmlqy4lYYhtWcIMd7COtW9MR11EN0YI47XcvCk/gviz/tq?sheet=Grade6&tq=SELECT*');


    query.send(handleQueryResponse);
}

// Called when the query response is returned.
function handleQueryResponse(response) {

	if (testing == true)
	{
		console.log("2 - Hello World!");
	}
	
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}


	var data = response.getDataTable();

	maxRows = data.getNumberOfRows();
	maxCols = data.getNumberOfColumns();


	if (testing == true)
	{
		console.log('There are '+maxRows+' rows');
		console.log('There are '+maxCols+' cols');	
	}

	var maxEvent = 3;

	var rowdata = new Array(maxCols);
	alldata = new Array(maxRows);
	
	eventRows = new Array(maxEvent);
	ribbonRows = 0;
	
	for (var q = 0; q < maxEvent; q++)
	{
		eventRows[q] = 0;
	}


	for (var r = 0; r < maxRows; r++)
	{
		alldata[r] = new Array(maxCols);
		for (var c = 0; c < maxCols; c++)
		{
			var info = data.getValue(r,c);
			
			if (info == null)
			{
				alldata[r][c] = "";
			}
			else
			{
				alldata[r][c] = info;	
			}
			
			if (alldata[r][3] == "Shot Putt")
			{
				eventRows[0]++;
			}
			if (alldata[r][3] == "Long Jump")
			{
				eventRows[1]++;
			}
			if (alldata[r][3] == "Discus")
			{
				eventRows[2]++;
			}
			
			// if they are ribbon winners add one to count
			if (alldata[r][8] == 1 || alldata[r][8] == 2)
			{
				ribbonRows++;
			}
		}
	}
	

	ribbondata = new Array(ribbonRows);
	
	ribbonRows = 0;
	// copy only the ribbon winner data
	for (var r = 0; r < maxRows; r++)
	{
		if (alldata[r][8] == 1 || alldata[r][8] == 2)
		{
			ribbondata[ribbonRows] = new Array(maxCols);
		
			for (var c = 0; c < maxCols; c++)
			{
				ribbondata[ribbonRows][c] = alldata[r][c];	
			}
			ribbonRows++;
		}
	}
	
	eventData = new Array(maxEvent);
	
	for (var x = 0; x < eventData.length; x++)
	{
		eventData[x] = new Array(eventRows[x]);
		eventRows[x] = 0;
	}
	
	
	// copy shotputt data
	// copy discus data
	// copy longjump data
	
	for (var x = 0; x < eventData.length; x++)
	{
		for (var r = 0; r < maxRows; r++)
		{
			if (x == 0 && alldata[r][3] == "Shot Putt")
			{
				eventData[x][eventRows[x]] = new Array(maxCols);
		
				for (var c = 0; c < maxCols; c++)
				{
					if (c == 10 && alldata[r][c] == "")
					{
						eventData[x][eventRows[x]][c] = "0.00";			
					}
					else 
					{
						if (c == 10)
						{
							var d = "00";
							var w = 0;
							if (alldata[r][10] != 0)
							{
								if (alldata[r][10].toString().indexOf('.') == -1)
								{
									w = alldata[r][10].toString();
									d = "00";
								}
								else
								{
									w = alldata[r][10].toString().substr(0,alldata[r][10].toString().indexOf('.'));			
									d = alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length);
									if (alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length).length == 1)
									{
										d += "0";				
									}
				
								}
							}
							eventData[x][eventRows[x]][c] = w+"."+d;	
						}
						else
							eventData[x][eventRows[x]][c] = alldata[r][c];	
					}
				}
				eventRows[x]++;
			} // shotput if
		
			if (x == 1 && alldata[r][3] == "Long Jump")
			{
				eventData[x][eventRows[x]] = new Array(maxCols);
		
				for (var c = 0; c < maxCols; c++)
				{
					if (c == 10 && alldata[r][c] == "")
					{
						eventData[x][eventRows[x]][c] = "0.00";			
					}
					else 
					{
						if (c == 10)
						{
							var d = "00";
							var w = 0;
							if (alldata[r][10] != 0)
							{
								if (alldata[r][10].toString().indexOf('.') == -1)
								{
									w = alldata[r][10].toString();
									d = "00";
								}
								else
								{
									w = alldata[r][10].toString().substr(0,alldata[r][10].toString().indexOf('.'));			
									d = alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length);
									if (alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length).length == 1)
									{
										d += "0";				
									}
				
								}
							}
							eventData[x][eventRows[x]][c] = w+"."+d;	
						}
						else
							eventData[x][eventRows[x]][c] = alldata[r][c];	
					}
				}
				eventRows[x]++;
			} // long jump if

			if (x == 2 && alldata[r][3] == "Discus")
			{
				eventData[x][eventRows[x]] = new Array(maxCols);
		
				for (var c = 0; c < maxCols; c++)
				{
					if (c == 10 && alldata[r][c] == "")
					{
						eventData[x][eventRows[x]][c] = "0.00";			
					}
					else 
					{
						if (c == 10)
						{
							var d = "00";
							var w = 0;
							if (alldata[r][10] != 0)
							{
								if (alldata[r][10].toString().indexOf('.') == -1)
								{
									w = alldata[r][10].toString();
									d = "00";
								}
								else
								{
									w = alldata[r][10].toString().substr(0,alldata[r][10].toString().indexOf('.'));			
									d = alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length);
									if (alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length).length == 1)
									{
										d += "0";				
									}
				
								}
							}
							eventData[x][eventRows[x]][c] = w+"."+d;	
						}
						else
							eventData[x][eventRows[x]][c] = alldata[r][c];	
					}
				}
				eventRows[x]++;
			} // if discus


		} // for each row in the event
	} // for all events

	// allow data to be shown after it has been submitted
	dataSubmitted = true;

	// hide textbox and button
	urlinp.hide();
	submitbutton.hide();

}