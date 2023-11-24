const selfVideo = document.getElementById('self-video')
const othersVideo = document.getElementById('others-video')
const joinButton = document.getElementById('join-button')

let peer = new Peer()
peer.on('open',()=>{

})

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


let userMedia = navigator.getUserMedia

joinButton.onclick = ()=>{
    let id = 'peer-id'
    userMedia(otherConstraint,stream=>{
            let call = peer.call(id, stream);
            call.on('stream', function(remoteStream) {
            othersVideo.srcObject = remoteStream
            othersVideo.play()
            });
        }, function(err) {
            console.log('Failed to get local stream' ,err);
    })
}


navigator.mediaDevices.getUserMedia(selfConstraint).then(function(stream){
    selfVideo.srcObject = stream
    selfVideo.play()

}).catch(
    function(error){
        console.log(error)
    }
)
