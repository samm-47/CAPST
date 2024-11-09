from cryptography.fernet import Fernet

# Generate a key (This should be stored securely, e.g., in GitHub Secrets, NOT hardcoded)
def generate_key():
    key = Fernet.generate_key()
    with open("secret.key", "wb") as key_file:
        key_file.write(key)

# Load the key
def load_key():
    return open("secret.key", "rb").read()

# Encrypt the file
def encrypt_file(filename):
    key = load_key()
    f = Fernet(key)

    with open(filename, "rb") as file:
        file_data = file.read()

    encrypted_data = f.encrypt(file_data)

    with open(f"{filename}.encrypted", "wb") as file:
        file.write(encrypted_data)

if __name__ == "__main__":
    generate_key()  # Run this only once to generate and save the key
    encrypt_file(".env")  # Encrypt the .env file
