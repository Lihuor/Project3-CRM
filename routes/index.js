const express = require ('express'); 
const router = express.Router(); 
const Inventory = require('../models/Inventory'); 

router.get('/inventories', function(req, res) { 
  Inventory.find(function(err, inventories) {
    res.json(inventories);
  });
});

router.get('/inventories/:id', function(req, res) {  
  Inventory.findById(req.params.id, function(err, inventory) {
    if (!inventory) {
      res.status(404).send('No result found');
    } else {
      res.json(inventory);
    }
  });
});

router.post('/inventories', function(req, res) {     
  let inventory = new Inventory(req.body);
  inventory.save()
    .then(inventory => {
      res.send(inventory);
    })
    .catch(function(err) {
      res.status(422).send('Inventory add failed');
    });
});

router.patch('/inventories/:id', function(req, res){    
  Inventory.findByIdAndUpdate(req.params.id, req.body)
    .then(function() {
      res.json('Inventory updated');
    })
    .catch(function(err) {
      res.status(422).send("Inventory update failed.");
    });
});

router.delete('/inventories/:id', function(req, res) {  
  Inventory.findById(req.params.id, function(err, inventory) {
    if (!inventory) {
      res.status(404).send('Inventory not found');
    } else {
      Inventory.findByIdAndRemove(req.params.id)
        .then(function() { res.status(200).json("Inventory deleted") })
        .catch(function(err) {
          res.status(400).send("Inventory delete failed.");
        })
    }
  });
})

module.exports = router;