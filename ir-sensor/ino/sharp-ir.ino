const int sensorpin = A0;
int sensorvalue = 0;
void setup(){
  Particle.variable("sharp",&sensorvalue,INT);
  sensorvalue = analogRead(sensorpin);
}
void loop(){
  sensorvalue = analogRead(sensorpin);
}