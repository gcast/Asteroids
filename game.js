(function(root){

	var Asteroids = root.Asteroids = (root.Asteroids || {})

	var Game = Asteroids.Game = function(context) {
		this.context = context;
		this.asteroids = this.addAsteroids(15);
		this.ship = new Asteroids.Ship([Game.DIM_X / 2, Game.DIM_Y / 2], [0,0], this);
		this.bullets = [];
		window.bullets = this.bullets
	};

	Game.DIM_X = 700;
   	Game.DIM_Y = 700;

	Game.prototype.addAsteroids = function(num) {
		var asteroids = []

		for(var i = 0; i < num; i++) {
			asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
		}

		return asteroids
	}

	Game.prototype.draw = function() {
	 	var game = this;

     	game.context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	
     	game.asteroids.forEach(function (asteroid){
     	  asteroid.draw(game.context);
     	});

     	game.bullets.forEach(function (bullet){
       		bullet.draw(game.context);
     	});

     	game.ship.draw(game.context)
	}

	Game.prototype.move = function() {
		this.asteroids.forEach(function (asteroid) {
			asteroid.move()
		})

		this.bullets.forEach(function (bullet) {
       		bullet.move()
     	});

		this.ship.move()
	}

	Game.prototype.step = function() {
		this.move()
		this.checkCollisions()
		this.draw()
	}

	Game.prototype.start = function() {
		window.asteroids = this.asteroids
		var game = this;

		key('w', function(){ game.ship.power([0, -0.5]); });
		key('s', function(){  game.ship.power([0, 0.5]); });
    	key('a', function(){ game.ship.power([-0.5, 0]); });
    	key('d', function(){  game.ship.power([0.5, 0]); });
    	key('space', function(){ game.fireBullet(); });

		interval = window.setInterval(function() {
			game.step()
		}, 30);

	}

  	Game.prototype.fireBullet = function(){
  	  var bullet = this.ship.fireBullet();
  	  if(bullet){
  	    this.bullets.push(bullet);
  	  };
  	};

	Game.prototype.stop = function() {
		clearInterval(interval);
	}

	Game.prototype.checkCollisions = function() {
		var game = this;

		this.bullets.forEach(function (bullet){
			bullet.hitAsteroids()
		});

		this.asteroids.forEach(function(asteroid){
			if(asteroid.isCollidedWith(game.ship)) {
				game.stop()
				alert("The game has ended")
			}
		});
	}

	Game.prototype.removeAsteroid = function(asteroid) {
		this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
	}

	Game.prototype.removeBullet = function(bullet) {
		this.bullets.splice(this.bullets.indexOf(bullet), 1);
	}

})(this);