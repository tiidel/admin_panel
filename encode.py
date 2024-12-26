import base64

# Define username and password
username = "ADSPROD2024"
password = "ADSLTS@P1-PR0D_API-2024"

# Concatenate in the form 'username:password'
credentials = f"{username}:{password}"

# Encode to Base64
encoded_credentials = base64.b64encode(credentials.encode('utf-8')).decode('utf-8')

# Print the result
print(f"Base64 Encoded Credentials: {encoded_credentials}")