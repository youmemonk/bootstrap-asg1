require(Modules.AI)

let dialogflow, call, hangup

//overwritting default print (printing page) with console
print = function (message) {
    let currentDate = new Date();
    console.log(currentDate, message)
};

let telephoneNumber = 19295265368,
    OutboundNumber = 917021223772,
    callType = 0; // 0 - inbound , 1 - outbound

if (callType == 0) {
    VoxEngine.addEventListener(AppEvents.CallAlerting, (e) => {
        let call = VoxEngine.callPSTN(e.destination, telephoneNumber);
        VoxEngine.easyProcess(e.call, call);
        call.addEventListener(CallEvents.Connected, onCallConnected)
        call.addEventListener(CallEvents.Disconnected, VoxEngine.terminate)
        call.addEventListener(CallEvents.Failed, VoxEngine.terminate)
    });
} else {
    VoxEngine.addEventListener(AppEvents.Started, (e) => {
        let call = VoxEngine.callPSTN(OutboundNumber, telephoneNumber)
        call.addEventListener(CallEvents.Connected, onCallConnected)
        call.addEventListener(CallEvents.Disconnected, VoxEngine.terminate)
        call.addEventListener(CallEvents.Failed, VoxEngine.terminate)
    });
}


onCallConnected = function (e) {
    // Create Dialogflow object
    // https://voximplant.com/docs/references/voxengine/ai/dialogflowsettings
    dialogflow = AI.createDialogflow({
        lang: DialogflowLanguage.ENGLISH_US,
        agentId: 713,
        environmentId: "49afe589-dbdb-429f-bf91-e49c01095681"
    })
    dialogflow.addEventListener(AI.Events.DialogflowResponse, onDialogflowResponse)
    // Sending WELCOME event to let the agent says a welcome message
    dialogflow.sendQuery({ event: { name: "Hi", language_code: "en" } })
    // Playback marker used for better user experience
    dialogflow.addMarker(-300)
    // Start sending media from Dialogflow to the call
    dialogflow.sendMediaTo(call)
    dialogflow.addEventListener(AI.Events.DialogflowPlaybackFinished, (e) => {
        // Dialogflow TTS playback finished. Hangup the call if hangup flag was set to true
        if (hangup) call.hangup()
    })
    dialogflow.addEventListener(AI.Events.DialogflowPlaybackStarted, (e) => {
        // Dialogflow TTS playback started
    })
    dialogflow.addEventListener(AI.Events.DialogflowPlaybackMarkerReached, (e) => {
        // Playback marker reached - start sending audio from the call to Dialogflow
        call.sendMediaTo(dialogflow)
    })
}

// Handle Dialogflow responses
onDialogflowResponse = function (e) {
    // If DialogflowResponse with queryResult received - the call stops sending media to Dialogflow
    // in case of response with queryResult but without responseId we can continue sending media to dialogflow
    if (e.response.queryResult !== undefined && e.response.responseId === undefined) {
        call.sendMediaTo(dialogflow)
    } else if (e.response.queryResult !== undefined && e.response.responseId !== undefined) {
        // Do whatever required with e.response.queryResult or e.response.webhookStatus
        // If we need to hangup because end of conversation has been reached
        if (e.response.queryResult.diagnosticInfo !== undefined &&
            e.response.queryResult.diagnosticInfo.end_conversation == true) {
            hangup = true
        }

        // Telephony messages arrive in fulfillmentMessages array
        if (e.response.queryResult.fulfillmentMessages != undefined) {
            e.response.queryResult.fulfillmentMessages.forEach((msg) => {
                if (msg.platform !== undefined && msg.platform === "TELEPHONY") processTelephonyMessage(msg)
            })
        }
    }
}


// Process telephony messages from Dialogflow
processTelephonyMessage = function (msg) {
    // Transfer call to msg.telephonyTransferCall.phoneNumber
    if (msg.telephonyTransferCall !== undefined) {
        /**
      * Example:
      * dialogflow.stop()
      * let newcall = VoxEngine.callPSTN(msg.telephonyTransferCall.phoneNumber, "put verified CALLER_ID here")
      * VoxEngine.easyProcess(call, newcall)
      */
    }
    // Synthesize speech from msg.telephonySynthesizeSpeech.text
    if (msg.telephonySynthesizeSpeech !== undefined) {
        // See the list of available TTS languages at https://voximplant.com/docs/references/voxengine/language
        // Example: 
        // if (msg.telephonySynthesizeSpeech.ssml !== undefined) call.say(msg.telephonySynthesizeSpeech.ssml, {"language": VoiceList.Amazon.en_US_Joanna})
        // else call.say(msg.telephonySynthesizeSpeech.text, {"language": VoiceList.Amazon.en_US_Joanna})
    }
    // Play audio file located at msg.telephonyPlayAudio.audioUri
    if (msg.telephonyPlayAudio !== undefined) {
        // audioUri contains Google Storage URI (gs://), we need to transform it to URL (https://)
        let url = msg.telephonyPlayAudio.audioUri.replace("gs://", "https://storage.googleapis.com/")
        // Example: call.startPlayback(url)
    }
}
