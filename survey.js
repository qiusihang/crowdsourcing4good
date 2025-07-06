var survey = [
    {
        "id": "intro",
        "messages": [
            "Hi, I'm Andrea. I created this survey to understand if innocent online participants were involved into suspicious activities, \
            or studies that makes you uncomfortable. We want to know if you have a healthy working environment on the {platform}.",
            "First of all, let me ask you some questions related to your background.",
            "buttons-only:#OK, no problem."
        ]
    }, {
        "id": "opening",
        "messages": [
            "Have you experienced some suspicious studies (probably relates to illegal or immoral activities)?",
            "buttons-only:#Yes#No"
        ]
    }, {
        "id": "times",
        "messages": [
            "Can you recall how many times have you experienced such studies? If you remember the exact number, you can also type it in the messagebox and send it to me.",
            "buttons-only:#1-3#4-6#7-9#>=10"
        ]
    }, {
        "id": "frequency",
        "messages": [
            "How often have you experienced such studies?",
            "buttons-only:#More than once a week#Every week#Every month#Every year#Less than once a year"
        ]
    }, {
        "id": "suspicious",
        "messages": [
            "Can you describe the suspicious study you remember the most clearly? What did it ask you to do?"
        ]
    }, {
        "id": "suspicious_repeat",
        "messages": [
            "What did it ask you to do?"
        ]
    }, {
        "id": "suspicious2",
        "messages": [
            "Why do you think it was suspicious?"
        ]
    }, {
        "id": "suspicious3",
        "messages": [
            "Do you recall any other suspicious studies?",
            "buttons-only:#Yes#No"
        ]
    }, {
        "id": "measures",
        "messages": [
            "Do you think there are effective measures to report them, to prevent potential harms?",
            "buttons-only:#Yes#No"
        ]
    }, {
        "id": "measures_yes",
        "messages": [
            "What are the measures?"
        ]
    }, {
        "id": "measures_yes2",
        "messages": [
            "Have you used them often?",
            "buttons-only:#always#often#sometimes#rarely#never"
        ]
    }, {
        "id": "measures_no",
        "messages": [
            "What are your suggestions?"
        ]
    }, {
        "id": "comments",
        "messages": [
            "Any other comments?"
        ]
    }
];


var survey_qid = -1;
var survey_validate = function(input) {
    var strip = function(text) {return text.toLowerCase().replace(/[\s.,\/#!$%\^&\*;:{}=\-_'"`~()]/g, "");};
    if (strip(input).length < 1)  return false;
    if ( survey_qid >= survey.length ) return true;
    var q = survey[survey_qid];

    if ("validation" in q) {
        var message = q.messages[q.messages.length-1];
        var options = message.substring(message.indexOf('#'),message.length).split('#');
        var ans = input.split(';');
        var flag = false;
        options.forEach(function(e) {
            ans.forEach(function(a) {
                if (strip(e) == strip(a)) {
                    flag = true;
                }
            })
        });
        return flag;
    } else return true;
};

var survey_platform = "crowdsourcing platform";
var completion_code = "testcode";   // Workers who get the code directly from the source file will be rejected
var completion_code_m = "2SUSIHGP";
var completion_code_p = "25A0E7FE";
var completion_code_t = "7KNY13X6";

var survey_question = function(qid) {
    if ( qid >= survey.length ) return "";
    survey[qid].messages.forEach((item, i) => { survey[qid].messages[i] = item.replace("{platform}", survey_platform); });
    return survey[qid].messages;
}

var survey_next_question = function() {
    survey_qid += 1;
    return survey_question(survey_qid);
};

var survey_question_by_id = function(id) {
    for (var i = 0; i < survey.length; i++) {
        if (survey[i].id == id) {
            survey_qid = i;
            return survey_question(survey_qid);
        }
    }
    return survey_next_question();
};

var survey_repeat_question = function() {
    return text_unsure.concat(survey[survey_qid].messages);
};

var text_unsure = ["Sorry, I don\'t get it.|Sorry, what do you mean?|Sorry, I don\'t understand.|Can you provide a valid answer?"];
var text_more = ["OK. Can you tell me more?|Uh huh, and?|Good, go ahead.|Well... it will be better if you can tell me more.|Cool, go ahead please.|And?|Hmm... anything else?|Nice, anything more?|Nice! I want to know more :)|And then?|Come on, nothing else?|Un huh, and?"]
