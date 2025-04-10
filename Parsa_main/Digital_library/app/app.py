from flask import Flask, render_template, request, redirect, url_for, send_from_directory, flash
import smtplib
from email.mime.text import MIMEText
import os
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from postmarker.core import PostmarkClient
from dotenv import load_dotenv
import re
from sqlalchemy import or_ #to function the search bar

#Add a sanitize_filename function to prevent security issues:
import re

def sanitize_filename(filename):
    """Removes unsafe character and replaces spaces with huphens."""
    filename = re.sub(r'[^\w\s\-.]', '', filename) #this will keep the white spaces
    filename = filename.replace(' ', '-') #Replace spaces with hyphens
    return filename

load_dotenv()

app = Flask(__name__)
app.secret_key = 'supersecretkey'  # Needed for flashing messages

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///files.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Database Model
class File(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    upload_date = db.Column(db.DateTime, default=datetime.utcnow)
    category = db.Column(db.String(255), nullable=True)

with app.app_context():
    db.create_all()

@app.route('/download/<filename>')
def download_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)

@app.route('/')
def index():
    latest_files = File.query.order_by(File.upload_date.desc()).limit(5).all()
    return render_template('index.html', uploaded_files=latest_files, is_admin_page=False)

POSTMARK_API_TOKEN = os.environ.get('POSTMARK_API_TOKEN') #store in env variables.
POSTMARK_SENDER = 'nanavazadp@coventry.ac.uk'  # Replace with your verified sender email

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    success = None
    if request.method == 'POST':
        # ... (your contact form handling) ...
        return render_template('contact.html', success=success, is_admin_page=False)
    return render_template('contact.html', success=success, is_admin_page=False)

@app.route('/browse')
def browse_items():
    categories_data = [
        {'slug': 'biodiversity_and_ecology', 'name': 'Biodiversity & Ecology', 'image': 'biodiversity.jpg'},
        {'slug': 'wildlife_exploration', 'name': 'Wildlife Exploration', 'image': 'wildlife_exploration.jpg'},
        {'slug': 'endangered_species_history', 'name': 'Endangered Species History', 'image': 'endangered_history.jpg'},
        {'slug': 'conservation_technology', 'name': 'Conservation Technology', 'image': 'conservation_tech.jpg'},
        {'slug': 'ethics_in_conservation', 'name': 'Ethics in Conservation', 'image': 'ethics.jpg'},
        {'slug': 'wildlife_photography_and_illustration', 'name': 'Wildlife Photography & Illustration', 'image': 'wildlife_photo.jpg'},
        {'slug': 'wildlife_health_and_rehabilitation', 'name': 'Wildlife Health & Rehabilitation', 'image': 'wildlife_health.jpg'},
        {'slug': 'conservation_education', 'name': 'Conservation Education', 'image': 'conservation_education.jpg'},
        {'slug': 'funding_and_eco_tourism', 'name': 'Funding & Eco-Tourism', 'image': 'funding_tourism.jpg'},
        {'slug': 'indigenous_knowledge_and_conservation', 'name': 'Indigenous Knowledge & Conservation', 'image': 'indigenous_knowledge.jpg'},
        {'slug': 'environmental_laws_and_policies', 'name': 'Environmental Laws & Policies', 'image': 'environmental_laws.jpg'},
        {'slug': 'local_and_scientific_naming_of_species', 'name': 'Local & Scientific Naming of Species', 'image': 'naming_species.jpg'},
        {'slug': 'kids_guide_to_conservation', 'name': 'Kids\' Guide to Conservation', 'image': 'kids_conservation.jpg'},
    ]
    return render_template('browse_library.html', categories=categories_data, is_admin_page=False)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'pdf-file' not in request.files:
        flash("No file part!", 'danger')
        return redirect(request.url)

    file = request.files['pdf-file']

    if file.filename == '':
        flash("No selected file!", 'danger')
        return redirect(request.url)

    if file:
        # Get the custom filename from the form
        custom_filename = request.form.get('custom_filename')

        # Use the original filename if no custom filename is provided
        if not custom_filename:
            custom_filename = file.filename

        # Sanitize the filename to prevent security issues
        custom_filename = sanitize_filename(custom_filename)

        filepath = os.path.join(app.config['UPLOAD_FOLDER'], custom_filename)
        file.save(filepath)

        category = request.form.get('category')
        new_file = File(filename=custom_filename, category=category)
        db.session.add(new_file)
        db.session.commit()

        flash("File uploaded successfully!", 'success')
        return redirect(url_for('admin_dashboard'))

@app.route('/remove', methods=['POST'])
def remove_file():
    file_id = request.form.get('file_id')
    file_entry = File.query.get(file_id)

    if file_entry:
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file_entry.filename)
        if os.path.exists(filepath):
            os.remove(filepath)

        db.session.delete(file_entry)
        db.session.commit()
        flash("File removed successfully!", 'success')
    else:
        flash("File not found!", 'danger')

    return redirect(url_for('admin_dashboard'))

@app.route('/admin')
def admin_dashboard():
    files = File.query.all()
    return render_template('admin_dashboard.html', uploaded_files=files, is_admin_page=True)

@app.route('/browse/<category_slug>')
def browse_category(category_slug):
    category_name = category_slug.replace('_', ' ').title() # Remove the 'And' to '&' replacement
    files = File.query.filter_by(category=category_name).all()
    return render_template(f'category/{category_slug}.html', files=files, category=category_name, is_admin_page=False)

if __name__ == '__main__':
    app.run(debug=True, port=5002)