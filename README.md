# React & Django

# Install
in frontend directory

* npm install
* npm start

# build for production
* npm run build

## backend
* Set the smtp settings in simple_form/settings.py file with your own params properly<br/>
<text>
EMAIL_FROM = 'example@gmail.com'<br/>
EMAIL_HOST_USER = 'example@gmail.com'<br/>
EMAIL_HOST_PASSWORD = 'blablabla'
</text>
* pip3 install -r requirements.txt
* python3 manage.py makemigrations
* python3 manage.py migrate
* python3 manage.py collectstatic
* python3 manage.py runserver
