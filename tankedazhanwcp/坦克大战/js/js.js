// JavaScript Document
function Tank(x,y,direct,speed,color){
		this.x=x;
		this.y=y;
		this.direct=direct;
		this.speed=speed;
		this.color=color;
		this.isLive=true;
	}
Tank.prototype={
	moveUP:function(){
		this.y-=this.speed;
	},
	moveRight:function(){
		this.x+=this.speed;
	},
	moveDown:function(){
		this.y+=this.speed;
	},
	moveLeft:function(){
		this.x-=this.speed;
	},
	
}
//==========子弹类
function Bullet(x,y,direct,color,speed,type,tank){
	this.x=x;
	this.y=y;
	this.timer=null;
	this.direct=direct;
	this.color=color;
	this.speed=speed;
	this.isLive=true;
	this.type=type;
	this.tank=tank;
}
Bullet.prototype={
	run:function(){
		
		if(this.x<=0||this.x>=1000||this.y<=0||this.y>=1000){
			//子弹要停止.
			window.clearInterval(this.timer);
			//子弹死亡
			this.isLive=false;
			if(this.type=="enemy"){
				this.tank.bulletIsLive=false;
			}
		}
		else{
			//这个可以去修改坐标
				switch(this.direct){
					case 0:
							this.y-=this.speed;
							break;
					case 1:
							this.x+=this.speed;
							break;
					case 2:
							this.y+=this.speed;
							break;
					case 3:
							this.x-=this.speed;
							break;
				}
		}	
	}	
}
	//==============英雄类
function Hero(x,y,direct,speed,color){
	Tank.call(this,x,y,direct,speed,color);
}
Hero.prototype=new Tank;
Hero.prototype.shoot=function(){
		
	switch(this.direct){
		case 0:
			heroBullet=new Bullet(this.x+31,this.y-42 ,0,"#2F4E00",6,"hero",this);
		break;
		case 1:
			heroBullet=new Bullet(this.x+104,this.y+31,1,"#2F4E00",6,"hero",this);
		break;
		case 2:
			heroBullet=new Bullet(this.x+31,this.y+105,2,"#2F4E00",6,"hero",this);
		break;
		case 3:
			heroBullet=new Bullet(this.x-44,this.y+31,3,"#2F4E00",6,"hero",this);
		break;
	}
	heroBullets.push(heroBullet);
	var timer=window.setInterval("heroBullets["+(heroBullets.length-1)+"].run()",50);
	//"heroBullets["+(heroBullets.length-1)+"].run()"
	heroBullets[heroBullets.length-1].timer=timer;
}
//敌人类
function Enemy(x,y,direct,speed,color){
	Tank.call(this,x,y,direct,speed,color);
	this.count=0;
	this.bulletIsLive=true;
}
Enemy.prototype=new Tank;
Enemy.prototype.run=function(){
	switch(this.direct){
		case 0:
		if(this.y-35>0){
			this.y-=this.speed;
		}else{
			this.count==50	
		}
		break;
		case 1:
		if(this.x+105<1000){
			this.x+=this.speed;
		}else{
			this.count==50	
		}
		break;
		case 2:
		if(this.y+105<1000){
			this.y+=this.speed;
		}else{
			this.count==50	
		}
		break;
		case 3:
		if(this.x-35>0){
			this.x-=this.speed;
		}else{
			this.count==50	
		}
		break;
	}
	if(this.count==50){
		this.direct=Math.floor(Math.random()*4);
		this.count=0;
	}
	this.count++;
	
	if(this.bulletIsLive==false&&this.isLive){
		switch(this.direct){
			case 0:
			etBullet=new Bullet(this.x+31,this.y-42,this.direct,"black",6,"enemy",this);
			break;
			case 1:
			etBullet=new Bullet(this.x+104,this.y+31,this.direct,"black",6,"enemy",this);
			break;
			case 2:
			etBullet=new Bullet(this.x+31,this.y+105,this.direct,"black",6,"enemy",this);
			break;
			case 3: 
			etBullet=new Bullet(this.x-44,this.y+31,this.direct,"black",6,"enemy",this);
			break;
		}

		//把子弹添加到敌人子弹数组中
		enemyBullets.push(etBullet);
		for(var i=0;i<enemyBullets.length;i++){
			if(enemyBullets[i].x>hero.x&&enemyBullets[i].x<hero.x+70&&enemyBullets[i].y>hero.y
			&&enemyBullets[i].y<hero.y+70){
				alert("你死了！");	
			}
		}
		//console.log(enemyBullets);
		//启动新子弹run
		var mytimer=window.setInterval("enemyBullets["+(enemyBullets.length-1)+"].run()",50);
		enemyBullets[enemyBullets.length-1].timer=mytimer;

		this.bulletIsLive=true;
	}
}
function isHitEnemyTank(){
	
		//取出每颗子弹
		for(var i=0;i<heroBullets.length;i++){
			
				//取出一颗子弹
				var heroBullet=heroBullets[i];
				if(heroBullet.isLive){ //子弹是活的，才去判断
				//让这颗子弹去和遍历每个敌人坦克判断
				for(var j=0;j<enemyTanks.length;j++){
					
							var enemyTank=enemyTanks[j];
						
							if(enemyTank.isLive){
							//(看看这颗子弹，是否进入坦克所在矩形)
							//根据当时敌人坦克的方向来决定
							switch(enemyTank.direct){
								case 0: //敌人坦克向上
								case 2://敌人坦克向下
									if(heroBullet.x>=enemyTank.x&&heroBullet.x<=enemyTank.x+68
										&&heroBullet.y>=enemyTank.y&&heroBullet.y<=enemyTank.y+70){
										//把坦克isLive 设为false ,表示死亡
										enemyTank.isLive=false;
										//该子弹也死亡
										heroBullet.isLive=false;
									}
								break;
								case 1: //敌人坦克向右
								case 3://敌人坦克向左
									if(heroBullet.x>=enemyTank.x&&heroBullet.x<=enemyTank.x+70
										&&heroBullet.y>=enemyTank.y&&heroBullet.y<=enemyTank.y+68){
										//把坦克isLive 设为false ,表示死亡
										enemyTank.isLive=false;
										heroBullet.isLive=false;
									}
								break;

							}

						}


				}//for
			}
		}
}