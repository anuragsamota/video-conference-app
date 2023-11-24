const selfVideo = document.getElementById("self-video")
const othersVideo = document.getElementById("others-video")
const hostIdDisplay = document.getElementById("host-id")

let userMedia = navigator.getUserMedia

let otherConstraint = {
    audio:true,
    video:true
}

let selfConstraint = {
    audio:false,
    video:{
        facingmode:"user"
    }
}



//call handeling
let peer = new Peer('peer-id')
peer.on('open',()=>{
    hostIdDisplay.innerHTML = "Meeting ID : "+ peer._id
})


peer.on('call',call=>{
    userMedia(otherConstraint, function(stream) {
        call.answer(stream); // Answer the call with an A/V stream.
        call.on('stream', function(remoteStream) {
            othersVideo.srcObject = remoteStream
            othersVideo.play()
        });
      }, function(err) {
        console.log('Failed to get local stream' ,err);
      });
})

navigator.mediaDevices.getUserMedia(selfConstraint).then(function(stream){
    selfVideo.srcObject = stream
    selfVideo.play()

}).catch(
    function(error){
        console.log(error)
    }
)
