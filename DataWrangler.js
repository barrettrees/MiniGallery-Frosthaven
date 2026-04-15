/* Singleton DataWrangler class
 * 
 * Interfaces with Loki.js to store, manage, and query data objects
 * 
 */

var DataWrangler = (function () {

	var db, models_db

	function init () {
		db = new loki('db.json');
		if (!db.getCollection('models')) {
			models_db = db.addCollection('models');
			models_db.insert(models);
		}
		db.saveDatabase();
	}
	
	function getAllModels() {
		models_db = db.getCollection('models');
		// Get all models sorted by name
		return models_db.chain().simplesort("name").data();
	}
	
	function getModelByName (name) {
		// models_db = db.getCollection('models');
		
		return models_db.findOne({name: name});
	}

    return { // Public Functions:        
        init : init,
        getAllModels : getAllModels, 
        getModelByName : getModelByName,
 
        // Returns the unique instance
        // Creates the instance if it doesn't exist yet 
        getInstance : function () {
            if (!instance) {
                instance = createInstance ();
            }
            return instance;
        }

    };
})(); 