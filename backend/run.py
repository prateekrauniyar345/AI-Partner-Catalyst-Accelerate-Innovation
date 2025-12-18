from app import create_app


app = create_app()


@app.route('/')
def index():
    return "Welcome to the Flask Application!"


if __name__ == "__main__":
    app.run()