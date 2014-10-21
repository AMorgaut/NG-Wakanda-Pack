const
    COUNT_EMPLOYEES_TO_CREATE = 120;

self.onconnect = function initAppWorkerOnConnect(event) {
    
    var
        generator,
        vendor,
        jane,
        thomas,
        clients;

    // if data empty, generate fake data
    if (ds.Employee.length === 0) {
    	generator = require("fakedata/generator");

    	console.info(" ::::: Creating ", COUNT_EMPLOYEES_TO_CREATE, " Employees...");
    	generator.buildFakeData(COUNT_EMPLOYEES_TO_CREATE, {log: false});
    	console.info(" End creating Employees. Employees: ", ds.Employee.length, ", Companies: ", ds.Company.length, ", Country: ", ds.Country.length, " ::::: ");

        vendor = ds.Vendor.find('firstName == BILL || gender == M');
        vendor.firstName = 'BILL';
        vendor.save();

        jane =  ds.Employee.find('firstName == JANE || gender == F');
        jane.firstName = 'JANE';
        jane.vendor = vendor;
        jane.save();

        thomas =  ds.Employee.find('firstName == THOMAS || (gender == M && ID != :1', vendor.ID);
        thomas.firstName = 'THOMAS';
        thomas.vendor = vendor;
        thomas.save();

        clients = ds.Employee.query('ID not in %1', [vendor.ID, jane.ID, thomas.ID]);

    	ds.flushCache();
    }
    
    console.log('close the initApp shared worker');
    self.close();
};