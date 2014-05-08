(function (root){

	var Asteroids = root.Asteroids = (root.Asteroids || {})

	var Bullet = Asteroids.Bullet = function(direction, position, game) {
		this.game = game
		var normalizedDirection = Bullet.normalizeDirection(direction)
		var vel = [normalizedDirection[0]*Bullet.SPEED, normalizedDirection[1]*Bullet.SPEED]
		
		Asteroids.MovingObject.call(this, position, vel, Bullet.RADIUS, Bullet.COLOR);
	};

	Bullet.inherits(Asteroids.MovingObject)

	Bullet.SPEED = 8
	Bullet.RADIUS = 2;
   	Bullet.COLOR = "red";

	Bullet.normalizeDirection = function(direction) {
		var dx = direction[0];
     	var dy = direction[1];
     	var magnitude = Math.sqrt((dx * dx) + (dy * dy));

     	return [dx / magnitude, dy / magnitude];
	}

	Bullet.prototype.hitAsteroids = function() {
		var bullet = this;

		bullet.game.asteroids.forEach(function (asteroid) {
			if(asteroid.isCollidedWith(bullet)) {
				bullet.game.removeAsteroid(asteroid)
				bullet.game.removeBullet(bullet)
			}
		});
	};

})(this);