from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from flask_cors import CORS
from langdetect import detect
from dotenv import load_dotenv
import time
import subprocess
import logging
from flask_mail import Mail, Message

# Initialize Flask app
app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
# Function to decrypt the .env file
load_dotenv()

# Retrieve API keys from the environment variables
API_KEYS = [
    os.environ.get("GENAI_API_KEY_1"),
    os.environ.get("GENAI_API_KEY_2"),
]

# Initial API key index
current_api_key_index = 0

# Function to get the current API key
def get_current_api_key():
    return API_KEYS[current_api_key_index]

# Function to switch to the next API key
def switch_api_key():
    global current_api_key_index
    current_api_key_index = (current_api_key_index + 1) % len(API_KEYS)

# Configure the Generative AI model
def configure_genai():
    genai.configure(api_key=get_current_api_key())
    return genai.GenerativeModel("gemini-1.5-flash-8b")

# Define a route for the chatbot interaction
chat_history = [
    {"role": "user", "parts": "Hello, you are a chatbot designed to help users with sustainability related questions."},
    {"role": "model", "parts": "Hello! How can I help you with sustainability?"}  # Shortened response
]

# Language detection function
def detect_language(text):
    try:
        return detect(text)
    except:
        return 'en'  # Default to English

@app.route('/api/chat', methods=['POST'])
def chat_with_bot():
    global chat_history
    data = request.get_json()
    user_question = data.get('question') + " Please respond in no more than 200 words. Output in sentences."

    if not user_question:
        return jsonify({"error": "Question is required"}), 400

    # Detect language
    language = detect_language(user_question)
    logging.info(f"Detected language: {language}")

    # If the detected language is not English, include it in the system instructions
    if language != 'en':
        chat_history.insert(0, {"role": "system", "parts": f"Respond in {language}."})

    # Append the user's question to the chat history
    chat_history.append({"role": "user", "parts": user_question})

    logging.info(f"User question: {user_question}")

    try:
        # Create a new chat session
        model = configure_genai()  # Reconfigure the model with the current API key
        chat_session = model.start_chat(history=chat_history)

        # Generate a response from the model using send_message
        response = chat_session.send_message(user_question)
        
    except Exception as e:
        # If rate limit error (or other error), switch the API key and retry
        if 'rate limit' in str(e).lower():  # You can refine this check depending on the error message
            logging.warning(f"Rate limit reached for API Key {get_current_api_key()}. Switching to the next key.")
            switch_api_key()  # Switch to the next API key
            time.sleep(2)  # Optional: Wait a little before retrying
            return chat_with_bot()  # Retry with the new API key
        else:
            logging.error(f"Error calling chat model: {str(e)}")
            return jsonify({"error": "Failed to communicate with the model."}), 500

    response_text = response.text if hasattr(response, 'text') else "No response text available"
    logging.info(f"Model response: {response_text}")

    # Append the model's response to the chat history
    chat_history.append({"role": "model", "parts": response_text})

    return jsonify({"response": response_text})


@app.route('/api/chat/calc', methods=['POST'])
def chat():
    data = request.get_json()  # Get the data sent from the frontend
    score = data.get('score')
    print(score)

    # Ensure that the score is provided
    if not score:
        return jsonify({"error": "Score is required"}), 400

    # Construct the user's question or prompt based on the score
    user_question = f"Given the sustainability score of {score}, explain to the user, how they can improve to be more sustainable for their home and lifestyle. The ranking is A - F and S is perfect. Output in 100 words and in sentences. Spacing should be 1.5."

    logging.info(f"User question: {user_question}")

    try:
        # Start a chat session with the AI model
        model = configure_genai()  # Reconfigure the model with the current API key
        chat_session = model.start_chat(history=[])  # You can pass an empty chat history if not needed

        # Generate a response from the model using the user question
        response = chat_session.send_message(user_question)
        
    except Exception as e:
        # Handle errors like rate limit or other issues
        if 'rate limit' in str(e).lower():
            logging.warning(f"Rate limit reached for API Key {get_current_api_key()}. Switching to the next key.")
            switch_api_key()  # Switch to the next API key
            time.sleep(2)  # Optional: Wait before retrying
            return chat()  # Retry with the new API key
        else:
            logging.error(f"Error calling chat model: {str(e)}")
            return jsonify({"error": "Failed to communicate with the model."}), 500

    # Get the response text from the model
    response_text = response.text if hasattr(response, 'text') else "No response text available"
    logging.info(f"Model response: {response_text}")

    # Return the AI-generated response
    return jsonify({"response": response_text})

@app.route('/api/generate_title', methods=['POST'])
def generate_title():
    data = request.get_json()
    user_input = data.get('input')

    if not user_input:
        return jsonify({"error": "Input is required"}), 400

    # Construct a prompt for the AI to generate a title
    prompt = f"Generate a concise and relevant title for a chat session based on the following user input: '{user_input}'. The title should be no more than 5 words."

    try:
        model = configure_genai()  # Reconfigure the model with the current API key
        chat_session = model.start_chat(history=[])  # Start a new chat session

        # Generate a response from the model using the prompt
        response = chat_session.send_message(prompt)
        
    except Exception as e:
        if 'rate limit' in str(e).lower():
            logging.warning(f"Rate limit reached for API Key {get_current_api_key()}. Switching to the next key.")
            switch_api_key()  # Switch to the next API key
            time.sleep(2)  # Optional: Wait before retrying
            return generate_title()  # Retry with the new API key
        else:
            logging.error(f"Error calling chat model: {str(e)}")
            return jsonify({"error": "Failed to communicate with the model."}), 500

    response_text = response.text if hasattr(response, 'text') else "No response text available"
    logging.info(f"Generated title: {response_text}")

    return jsonify({"title": response_text.strip()})

# Define a route for the chatbot interaction
chat_history = [
    {"role": "user", "parts": "Hello, you are a chatbot designed to be a glossary for real estate. Only output in sentences."},
    {"role": "model", "parts": "Hello! How can I help you with real estate terms today?"}
]


glossary_terms = [
    "2-Way Lighting", "2-Wire Lighting System", "2-Pipe HVAC System", "2-Stage Cooling", "2-Pane Window", "2-Pipe System", 
    "3-Way Valve", "3-Way Switch", "3-Layer Insulation", "3-Zone HVAC", "4-Pole Generator", "4-Point Solar Mount", 
    "5-Blade Fan", "5-Star Energy Rating", "5-Stage Filtration", "6-Layer Roof", "6-Star Energy Rating", 
    "7-Day Programmable Thermostat", "10-Year Sustainability Plan", 
    "10-Year Solar Warranty", "12V LED System", "24-Hour Energy Monitoring", "100% Recycled Material", "200W Solar Panel", "360° Wind Turbine",
    "Abiotic components", "Abiotic depletion", "ACH (Air Changes per Hour)",
    "Acid rain", "Acidification", "Advanced Framing", "AECB", "Aerobic digestion", "Afforestation",
    "Air barrier / airtightness membrane", "Air film resistance", "Air infiltration", "Air leakage index",
    "Air permeability", "Air-Source Heat Pump", "Airtightness", "Airtightness layer", "Airtightness line",
    "Airtightness test", "Alexa", "Alexa Routine", "Alexa Skill", "Alpha - value", "Alternative energy", "Android",
    "Application Programming Interface (API)", "Automations", "Balance point", "Balancing pond", "Batt Insulation",
    "BFRC Rating", "Bio-accumulation", "Biocide", "Biodegradation", "Biofuel", "Biological wastewater treatment",
    "Biomass", "Bioretention area", "Bixby", "Blackwater", "Blower Door Test", "Blown-in Insulation", "Bluetooth",
    "Breathable sheathing", "Breather membrane", "Breathing wall", "BREEAM", "Bridge", "Brown roof", "Building Envelope",
    "CAPEM", "Carbon neutral", "Carbon sequestration", "Carbon sink", "CarbonLite Programme",
    "Chlorofluorocarbons (CFC)", "Closed Cell (spray) Foam Insulation (CCF)", "Closed loop-recycling", "Co-generation",
    "Code for Sustainable Homes", "Coefficient of performance (COP)", "Cold bridging", "Cold spot",
    "Combined Heat and Power (CHP)", "Communication Protocol", "Compost", "Composting toilet", "Conditioned Space",
    "Connected Device", "Connected Home", "Connectivity Session", "Control4", "Cortana", "Cradle-to-*",
    "Cross-laminated timber (CLT) panels", "Daylight transmittance", "Deconstruction", "Decrement delay",
    "Decrement factor", "Deforestation", "Degree days", "Delivered energy", "Desertification",
    "Design for Deconstruction (DfD)", "Diffuse pollution", "Diffusion Open", "Diffusion Tight", "Direct-Gain System",
    "Displacement Ventilation", "Distributed generation", "District heating", "Diurnal heat flow",
    "Diurnal temperature variation", "Double Pane Windows", "Double-Stud Wall", "Downcycle", "Drainage Plane", "Driver",
    "Dual-Mesh Network", "Dynamic Pricing", "Earth construction", "Eco Sinope", "Eco-design", "Eco-label",
    "Effective Leakage Area", "Embodied energy", "Energy Assessment", "Energy Consumption Graphs", "Energy efficiency",
    "Engineered wood", "Energy Recovery Ventilator", "Energy Truss", "Engineered Lumber", "Enhanced Air Filtration",
    "Environmental profile", "Environmental profiling", "Ethernet", "Eutrophication", "Evaporative cooling", "Event",
    "F-factor", "Faucet Flow Restrictor", "Filter drain", "Filtration", "Fire-Resistant Insulation", 
    "First-Flush Water System", "Fixed Window for Efficiency", "Floor Radiant Heating System", "Flood Resilient Foundation", "Flood routeing", "Flow control device", "Flow-Control Faucet", "Fly ash (PFA - Pulverised Fuel Ash)", "Fresh Air Ventilation", 
    "Fresh water aquatic ecotoxicity", "FSC-Certified Timber", "Fuel-Efficient Home Design", "Fossil fuel", "Framing", "Fully Recyclable Materials","G-value",
    "Gasification", "Gateway", "Geofencing", "Geolocation", "Geotextile", "Geothermal energy",
    "Global Warming Potential (GWP)", "Google Assistant", "Google Home", "Green Building Standards", "Green Electricity",
    "Green Guide to Specification", "Green Power", "Green Register", "Green roof", "Greenhouse gases", "Greenwash",
    "Greywater", "Greywater Reuse", "Ground source heat pump (GSHP)", "Groundwater", "Hazardous waste", "Heat capacity",
    "Heat exchanger", "Heat island", "Heat Loss Parameter (HLP)", "Heat Pump", "Heat recovery",
    "Heat Recovery Ventilator", "Hot spots", "Home Automation", "Home Energy Rating System", "Home ID", "HomeKit", "Hub",
    "Hubitat", "Human toxicity", "Humidity", "Hydrocarbons", "Hydrochlorofluorocarbon (HCFC)", "Hydrofluorocarbon (HFC)",
    "Hygroscopic material", "Ice Dam", "Impermeable surface", "Indoor air quality (IAQ)", "Insulated Concrete Form",
    "Insulated Glass", "Insulating concrete formwork (ICF)", "Intelligent building", "Insulation", "Integration",
    "Internal heat gains", "Internet of Things (IoT)", "Interstitial condensation", "K-value", "Kiosk", "Kinetic Energy", "Kilowatt-hour", 
    "Knee Wall", "Krypton Gas", "Komatsu Equipment", "Land use",
    "Life cycle assessment (LCA)", "Life cycle costing (LCC)", "Life cycle approach", "Light pollution",
    "Living Building", "Low-Emissivity (Low-E) glass", "Low-impact development (LID)", "Low-Voltage lighting",
    "MERV rating", "Microgrid", "Microplastics", "Modular construction", "Modular Home", "Net-Zero Energy Building",
    "Non-Renewable energy", "Offsetting", "Onsite renewable energy", "Open-loop geothermal", "Passive house",
    "Passive Solar Design", "Photovoltaic (PV) energy", "Pollinator-friendly design", "Pollutant", "Pre-Assessment",
    "Prescriptive approach", "Proximity sensor", "Rain garden", "Renewable energy", "Retrofitting", "Roof garden", "Roof overhang", 
    "Runoff", "Rainwater harvesting", "Reclaimed materials", "Recycled content", "Radon mitigation", "Roof insulation", 
    "Rainwater collection system", "Rainwater filtration", "Rooftop solar panels", "Resource efficiency", "Reforestation", 
    "Renewable resource", "Retrofit design","Sanitary landfill", "Scaffolding", "Smart Building Technology", "Smart Grid",
    "Smart Meter", "Solar thermal energy", "Solar shading", "Solar tracker", "Solar wall", "Sustainable Architecture",
    "Sustainable Development", "Sustainable Materials", "Smart Building", "Smart Home", "Smart HVAC system",
    "Smart thermostat", "Solar panel", "Solar water heater", "Stormwater management", "Sustainable Urban Development",
    "Sustainability report", "Sustainable design", "Thermal bridge", "Thermal envelope", "Thermal mass",
    "Thermal transmittance", "Urban heat island", "Urban Planning", "Ventilation", "Vertical garden",
    "Water-efficient landscaping", "Water Harvesting", "Water Recycling", "Waterway", "Wetland", "Wind turbine",
    "Zero-energy building", "Zoning"
]



@app.route('/api/definition/<term>', methods=['GET'])
def get_definition(term):
    """
    This route handles fetching the definition of a term from the generative model.
    """
    user_question = f"Define the term '{term}' in simple language. Please respond in 300 words. Make it into 2-3 paragraphs with indentation. And keep it in simple terms for the user to understand. These are terms related to sustainabilty living."


    # Append the user's question to the chat history for context
    chat_history.append({"role": "user", "parts": user_question})
    
    model = configure_genai() 

    try:
        # Create a new chat session with the model, using the updated chat history
        chat_session = model.start_chat(history=chat_history)


        # Send the term definition request to the model
        response = chat_session.send_message(user_question)


        # Extract the response text
        response_text = response.text if hasattr(response, 'text') else "No response available."
       
    except Exception as e:
        print("Error calling chat model:", str(e))
        return jsonify({"error": "Failed to communicate with the model."}), 500


    # Append the model's response to the chat history
    chat_history.append({"role": "model", "parts": response_text})


    return jsonify({"term": term, "definition": response_text})


@app.route('/api/glossary', methods=['GET'])
def get_glossary():
   
    grouped_terms = groupTermsByFirstLetter(glossary_terms)
   
    return jsonify(grouped_terms)
   


def groupTermsByFirstLetter(glossary_terms):
    grouped = {}
    for term in glossary_terms:
        first_char = term[0].upper()


        # If the first character is a letter or a number, group accordingly
        group_key = first_char if first_char.isalpha() else 'Numbers & Others'
       
        if group_key not in grouped:
            grouped[group_key] = []
        grouped[group_key].append(term)
   
    return grouped
@app.route('/api/search', methods=['GET'])
def search_glossary():
    query = request.args.get('query', '').lower()
   
    if query:
        # Filter terms that start with the query
        filtered_terms = [term for term in glossary_terms if term.lower().startswith(query)]
        filtered_terms.sort()  # Sort terms alphabetically
    else:
        filtered_terms = glossary_terms


    return jsonify(filtered_terms)


@app.route('/api/sections', methods=['GET'])
def get_sections():
    # Group terms by their first letter (or '#' for numbers and others)
    grouped_terms = {}
    for term in glossary_terms:
        first_char = term[0].upper()
        group_key = first_char if first_char.isalpha() else 'Numbers & Others'
        if group_key not in grouped_terms:
            grouped_terms[group_key] = []
        grouped_terms[group_key].append(term)


    # Sort the keys: letters first (A-Z), then numbers/others
    sorted_keys = sorted(grouped_terms.keys(), key=lambda x: (x != 'Numbers & Others', x))


    sections = []
    for key in sorted_keys:
        section = {
            'title': 'Numbers & Others' if key == 'Numbers & Others' else key,
            'terms': sorted(grouped_terms[key])  # Sort terms alphabetically
        }
        sections.append(section)


    return jsonify(sections)

# Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('EMAIL_USER')  # Your email
app.config['MAIL_PASSWORD'] = os.getenv('EMAIL_PASS')  # Your app password
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('EMAIL_USER')

mail = Mail(app)

@app.route('/api/send-email', methods=['POST'])
def send_sustainability_email():
    data = request.json
    email = data.get('email')  # Recipient's email address
    insight = data.get('message')  # Chatbot response or sustainability tips


    if not email or not insight:
        return jsonify({"error": "Email and message are required"}), 400

    try:
        # Add a contextual header and footer
        subject = "Your Sustainability Insights 🌍"
        body = (
            f"Thanks for exploring sustainability with us!\n\n"
            f"Here’s what you asked for:\n\n"
            f"{insight}\n\n"
            f"Keep making eco-conscious choices!\n"
            f"\n— Your Sustainability Assistant 🌱"
            f"\n\n(Note: This is an automated message. Please do not reply.)"
        )

        msg = Message(subject=subject, recipients=[email], body=body)

        mail.send(msg)
        return jsonify({"message": "Sustainability insights sent successfully!"}), 200

    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({"error": "Failed to send email"}), 500

@app.route('/api/send-chat-email', methods=['POST'])
def send_chat_history_email():
    print("\n=== REQUEST RECEIVED ===")  # This should appear in Flask console
    print(f"Headers: {request.headers}")
    print(f"Data: {request.data}")
    
    if not request.is_json:
        print("Error: Request is not JSON")
        return jsonify({"error": "Request must be JSON"}), 400
        
    data = request.get_json()
    print(f"JSON data: {data}")  # Debug what's actually received
    
    email = data.get('email')
    selected_chats = data.get('selectedChats', [])
    chat_history = data.get('chatHistory', [])
    
    print(f"Email: {email}")
    print(f"Selected chats: {selected_chats}")
    print(f"Chat history length: {len(chat_history)}")

    if not email:
        print("Error: Email is required")
        return jsonify({"error": "Email is required"}), 400
    if not selected_chats or not isinstance(selected_chats, list):
        print("Error: No chats selected or invalid format")
        return jsonify({"error": "No chats selected or invalid format"}), 400

    try:
        # Print details of selected chats
        print("\n=== Selected Chats Details ===")
        chats_to_send = []
        for idx in selected_chats:
            if idx < 0 or idx >= len(chat_history):
                print(f"Invalid chat index skipped: {idx}")
                continue
            
            chat = chat_history[idx]
            print(f"Chat {idx}:")
            print(f"  Title: {chat.get('title', 'Untitled')}")
            print(f"  Messages: {len(chat.get('messages', []))}")
            
            # Print first message preview
            if chat.get('messages'):
                first_msg = chat['messages'][0]
                print(f"  First message: {first_msg.get('type')}: {first_msg.get('text', '')[:50]}...")
            
            chats_to_send.append(chat)

        if not chats_to_send:
            print("Error: No valid chats selected after filtering")
            return jsonify({"error": "No valid chats selected"}), 400

        # Format email content
        subject = "Your Selected Chat Histories"
        body = "Here are your selected chat histories:\n\n"
        
        for chat in chats_to_send:
            body += f"=== {chat.get('title', 'Untitled Chat')} ===\n"
            for message in chat.get('messages', []):
                sender = "You" if message.get('type') == "user" else "Assistant"
                body += f"{sender}: {message.get('text', '')}\n"
            body += "\n\n"
        
        body += "Thank you for using our sustainability chatbot!\n— Sustainability Team"

        # Print final email content
        print("\n=== Email Content To Be Sent ===")
        print(f"Subject: {subject}")
        print("Body:")
        print(body)
        print(f"Recipient: {email}")
        print("="*50)

        # Send email
        msg = Message(
            subject=subject,
            recipients=[email],
            body=body,
            sender=app.config['MAIL_DEFAULT_SENDER']
        )
        
        print("Attempting to send email...")
        mail.send(msg)
        print("Email sent successfully!")
        
        return jsonify({
            "message": f"Successfully sent {len(chats_to_send)} chat(s) to {email}",
            "sentCount": len(chats_to_send)
        }), 200

    except Exception as e:
        print(f"\n!!! Error sending email: {str(e)}")
        logging.error(f"Error sending chat history email: {str(e)}")
        return jsonify({
            "error": "Failed to send email",
            "details": str(e)
        }), 500



# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
