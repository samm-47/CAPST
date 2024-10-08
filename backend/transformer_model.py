import torch
import torch.nn as nn
import torch.nn.functional as F

class TransformerModel(nn.Module):
    def __init__(self, vocab_size, d_model, nhead, num_encoder_layers, num_decoder_layers):
        super(TransformerModel, self).__init__()
        self.transformer = nn.Transformer(
            d_model=d_model, 
            nhead=nhead, 
            num_encoder_layers=num_encoder_layers, 
            num_decoder_layers=num_decoder_layers
        )
        self.fc_out = nn.Linear(d_model, vocab_size)
        self.src_mask = None
        self.trg_mask = None

    def forward(self, src, trg):
        out = self.transformer(
            src, trg, 
            src_mask=self.src_mask, 
            tgt_mask=self.trg_mask
        )
        return self.fc_out(out)

# Example parameters
model = TransformerModel(
    vocab_size=30522, 
    d_model=512, 
    nhead=8, 
    num_encoder_layers=6, 
    num_decoder_layers=6
)
