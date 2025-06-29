<!-- run react frontend -->

cd cloudtryx
npm install
npm run dev

<!-- run django application -->
cd cldtrx
pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate
python manage.py runserver