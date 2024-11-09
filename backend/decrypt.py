from cryptography.fernet import Fernet
import os

# Load the encryption key (store it securely)
def load_key():
    # Get the encryption key from a secure location
    return open("secret.key", "rb").read()

# Decrypt and load environment variables directly
def decrypt_and_load_env(encrypted_filename):
    key = load_key()
    f = Fernet(key)

    # Read the encrypted file
    with open(encrypted_filename, "rb") as file:
        encrypted_data = file.read()

    # Decrypt the data
    decrypted_data = f.decrypt(encrypted_data).decode("utf-8")

    # Load environment variables from decrypted data
    for line in decrypted_data.splitlines():
        if "=" in line:
            key, value = line.split("=", 1)
            os.environ[key] = value

if __name__ == "__main__":
    decrypt_and_load_env(".env.encrypted")  # Decrypt and load directly into environment
