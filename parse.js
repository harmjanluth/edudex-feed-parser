const fs        	= require('fs');
const XmlStream 	= require('xml-stream');

const stream 		= fs.createReadStream('ncoi-20181206.1046.xml');
const xml 			= new XmlStream(stream);

var intervention   = {};

xml.collect('programLocation');
xml.on('endElement: program', function(program) {
  
  intervention 				= {};
  intervention.company 		= program.programClassification.orgUnitId;
  intervention.title 		= program.programDescriptions.programName['$text'];
  intervention.url 			= program.programDescriptions.webLink['$text'];
  intervention.description 	= 
  {
  							summary : program.programDescriptions.programDescriptionText['$text'],
  							description : program.programDescriptions.programDescriptionText['$text'],
  							descriptionHTML : program.programDescriptions.programDescriptionHtml['$text']
  }
  
  intervention.programAdmission =
  {
  							maxNumberOfParticipants : program.programAdmission.maxNumberOfParticipants,
  							minNumberOfParticipants : program.programAdmission.minNumberOfParticipants,
  							startDateDetermination : program.programAdmission.startDateDetermination
  }
  
  intervention.location		= program.programClassification.programLocation;
  intervention.duration		= 
  {
  							'amount' : program.programClassification.programDuration['$text'],
  							'unit' : program.programClassification.programDuration['$']['unit']	
  }
  
  intervention.costs		= program.programSchedule.genericProgramRun.cost;



  console.log(JSON.stringify(intervention));
  
  // Uncomment this!
  xml.pause();
})
