import os
import torch
from torch import nn
from torch.utils.data import DataLoader
from torchvision import datasets, transforms

# 1. Set up the device to be used (GPU, MPS, or CPU)
device = (
    "cuda" if torch.cuda.is_available()
    else "mps" if torch.backends.mps.is_available()
    else "cpu"
)
print(f"Using {device} device")

# 2. Define a custom neural network
class NeuralNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        self.flatten = nn.Flatten()
        self.linear_relu_stack = nn.Sequential(
            nn.Linear(28*28, 512),  # Fully connected layer 1
            nn.ReLU(),              # Activation function
            nn.Linear(512, 512),    # Fully connected layer 2
            nn.ReLU(),              # Activation function
            nn.Linear(512, 10),     # Output layer with 10 classes
        )

    def forward(self, x):
        x = self.flatten(x)  # Flatten the input
        logits = self.linear_relu_stack(x)  # Pass through layers
        return logits

# 3. Create an instance of the neural network
model = NeuralNetwork().to(device)
print(model)

# 4. Create a random input tensor (1 sample, 28x28 image)
X = torch.rand(1, 28, 28, device=device)
logits = model(X)  # Get logits (raw predictions) from the model

# 5. Convert logits to probabilities using Softmax
pred_probab = nn.Softmax(dim=1)(logits)
y_pred = pred_probab.argmax(1)  # Get the predicted class
print(f"Predicted class: {y_pred}")

# 6. Demonstrating layer operations on a random input
input_image = torch.rand(3, 28, 28)
print(f"Input image size: {input_image.size()}")

# Flatten the image (reshape it)
flatten = nn.Flatten()
flat_image = flatten(input_image)
print(f"Flattened image size: {flat_image.size()}")

# Apply a linear layer (from 28*28 to 20)
layer1 = nn.Linear(in_features=28*28, out_features=20)
hidden1 = layer1(flat_image)
print(f"Hidden layer size (before ReLU): {hidden1.size()}")

# Apply ReLU activation
hidden1 = nn.ReLU()(hidden1)
print(f"Hidden layer size (after ReLU): {hidden1}")

# 7. Demonstrating a small sequential model
seq_modules = nn.Sequential(
    flatten,
    layer1,
    nn.ReLU(),
    nn.Linear(20, 10)
)
input_image = torch.rand(3, 28, 28)
logits = seq_modules(input_image)

# Apply Softmax to get prediction probabilities
softmax = nn.Softmax(dim=1)
pred_probab = softmax(logits)
print(f"Predicted probabilities: {pred_probab}")

# 8. Display model parameters
print(f"Model structure: {model}\n\n")
for name, param in model.named_parameters():
    print(f"Layer: {name} | Size: {param.size()} | Values : {param[:2]} \n")
