from flask import Flask, render_template
from flask_socketio import SocketIO, send

app = Flask(__name__)
app.config['SECRET'] = 'secret!123'
socketio = SocketIO(app, cors_allowed_origins="*")

#triggers the handle message function
# waits for the message to be sent from the frontend
@socketio.on('message')
def handle_message(message):
    # when a message has been sent to someone
    print(f"Recieved message: {message}")
    if message != "User Connected!":
        # send message here
        send(message,broadcast=True)
    

@app.route('/')
def index():
    return render_template("test.html")

if __name__ == '__main__':
    socketio.run(app,host = "192.168.1.105",port=5000)



