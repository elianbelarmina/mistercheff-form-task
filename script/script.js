document.addEventListener('DOMContentLoaded', () => {
    const createTooltip = (element, message, tooltipId) => {
        let tooltip = document.getElementById(tooltipId);
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = tooltipId;
            document.body.appendChild(tooltip);
        }
        tooltip.innerText = message;
        tooltip.style.display = 'block';
        const rect = element.getBoundingClientRect();
        tooltip.style.left = `${rect.left}px`;
        tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
    };

    const hideTooltip = (tooltipId) => {
        const tooltip = document.getElementById(tooltipId);
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    };

    const addValidation = (input, regex, maxLength, tooltipId, errorMessage) => {
        input.addEventListener('input', () => {
            let value = input.value.replace(regex, '');
            if (value.length > maxLength) {
                value = value.substring(0, maxLength);
            }
            input.value = value;
            if (!new RegExp(`^${regex.source}{1,${maxLength}}$`).test(value)) {
                createTooltip(input, errorMessage, tooltipId);
            } else {
                hideTooltip(tooltipId);
            }
        });
        input.addEventListener('blur', () => hideTooltip(tooltipId));
    };

    const nomeLojaInput = document.getElementById('nomeLoja');
    addValidation(nomeLojaInput, /[^a-zA-Z0-9\- ]/g, 32, 'tooltip', 'Apenas letras, números, espaços e hífens são permitidos. Máximo de 32 caracteres.');

    const cnpjInput = document.getElementById('CNPJ');
    cnpjInput.addEventListener('input', () => {
        let rawValue = cnpjInput.value.replace(/[^0-9]/g, '').substring(0, 14);
        let formattedValue = rawValue.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
        cnpjInput.value = formattedValue;
        if (rawValue.length < 14) {
            createTooltip(cnpjInput, 'O CNPJ precisa ter exatamente 14 caracteres numéricos.', 'tooltip-cnpj');
        } else {
            hideTooltip('tooltip-cnpj');
        }
    });
    cnpjInput.addEventListener('blur', () => hideTooltip('tooltip-cnpj'));

    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', () => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(emailInput.value)) {
            createTooltip(emailInput, 'Por favor, insira um e-mail válido (exemplo@dominio.com).', 'tooltip-email');
        } else {
            hideTooltip('tooltip-email');
        }
    });
    emailInput.addEventListener('blur', () => hideTooltip('tooltip-email'));

    const contatoInput = document.getElementById('contato');
    contatoInput.addEventListener('input', () => {
        let contatoValue = contatoInput.value.replace(/\D/g, '').substring(0, 11);
        contatoValue = contatoValue.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');
        contatoInput.value = contatoValue;
        if (contatoValue.length < 13 || contatoValue.length > 15) {
            createTooltip(contatoInput, 'Telefone inválido. Por favor, digite um número válido', 'tooltip-contato');
        } else {
            hideTooltip('tooltip-contato');
        }
    });
    contatoInput.addEventListener('blur', () => hideTooltip('tooltip-contato'));

    const ruaInput = document.getElementById('rua');
    addValidation(ruaInput, /[^a-zA-Z\s]/g, 32, 'tooltip-rua', 'A rua deve conter apenas letras e ter no máximo 32 caracteres.');

    const numeroInput = document.getElementById('numero');
    addValidation(numeroInput, /[^0-9]/g, 5, 'tooltip-numero', 'O número deve conter apenas números e ter no máximo 5 caracteres.');

    const complementoInput = document.getElementById('complemento');
    addValidation(complementoInput, /[^a-zA-Z0-9\s.-]/g, 32, 'tooltip-complemento', 'Máximo de 32 caracteres.');

    const cepInput = document.getElementById('CEP');
    cepInput.addEventListener('input', () => {
        let cepValue = cepInput.value.replace(/[^0-9]/g, '').substring(0, 8);
        cepValue = cepValue.replace(/^(\d{5})(\d{3})$/, '$1-$2');
        cepInput.value = cepValue;
        if (!/^\d{5}-\d{3}$/.test(cepValue)) {
            createTooltip(cepInput, 'Deve-se conter 8 números', 'tooltip-cep');
        } else {
            hideTooltip('tooltip-cep');
        }
    });
    cepInput.addEventListener('blur', () => hideTooltip('tooltip-cep'));

    const bairroInput = document.getElementById('bairro');
    addValidation(bairroInput, /[^a-zA-ZÀ-ÿ\s]/g, 32, 'tooltip-bairro', 'O bairro deve conter apenas letras e ter no máximo 32 caracteres.');

    const cidadeInput = document.getElementById('cidade');
    addValidation(cidadeInput, /[^a-zA-ZÀ-ÿ\s]/g, 32, 'tooltip-cidade', 'A cidade deve conter apenas letras e ter no máximo 32 caracteres.');

    const estadoInput = document.getElementById('estado');
    estadoInput.addEventListener('input', () => {
        let estadoValue = estadoInput.value.toUpperCase().replace(/[^a-zA-Z]/g, '').substring(0, 2);
        estadoInput.value = estadoValue;
        if (!/^[A-Z]{2}$/.test(estadoValue)) {
            createTooltip(estadoInput, 'A UF deve conter apenas 2 letras.', 'tooltip-estado');
        } else {
            hideTooltip('tooltip-estado');
        }
    });
    estadoInput.addEventListener('blur', () => hideTooltip('tooltip-estado'));

    document.getElementById('imageFile').addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('image-preview').src = e.target.result;
                document.getElementById('image-preview-container').style.display = 'flex';
            };
            reader.readAsDataURL(file);
            document.getElementById('file-name').style.display = 'none';
        }
    });
});

// Validação em massa final

const validateForm = () => {
    let isValid = true;

    // Lista de campos e validações
    const validations = [
        {
            element: document.getElementById('nomeLoja'),
            regex: /^[a-zA-Z0-9\- ]{1,32}$/,
            tooltipId: 'tooltip-nomeLoja',
            message: 'Apenas letras, números, espaços e hífens são permitidos. Máximo de 32 caracteres.'
        },
        {
            element: document.getElementById('CNPJ'),
            regex: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
            tooltipId: 'tooltip-cnpj',
            message: 'O CNPJ precisa ter exatamente 14 caracteres no formato correto.'
        },
        {
            element: document.getElementById('email'),
            regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            tooltipId: 'tooltip-email',
            message: 'Por favor, insira um e-mail válido (exemplo@dominio.com).'
        },
        {
            element: document.getElementById('contato'),
            regex: /^\(\d{2}\) \d{4,5}-\d{4}$/,
            tooltipId: 'tooltip-contato',
            message: 'Telefone inválido. Por favor, digite um número válido.'
        },
        {
            element: document.getElementById('CEP'),
            regex: /^\d{5}-\d{3}$/,
            tooltipId: 'tooltip-cep',
            message: 'O CEP precisa ter o formato 00000-000.'
        },
        {
            element: document.getElementById('estado'),
            regex: /^[A-Z]{2}$/,
            tooltipId: 'tooltip-estado',
            message: 'A UF deve conter apenas 2 letras maiúsculas.'
        }
    ];

    // Verificar cada campo
    validations.forEach(({ element, regex, tooltipId, message }) => {
        if (!regex.test(element.value)) {
            createTooltip(element, message, tooltipId);
            isValid = false;
        } else {
            hideTooltip(tooltipId);
        }
    });

    return isValid;
};

// Chamada do validateForm para impedir incongruências

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('meuFormulario');
    
    form.addEventListener('submit', (event) => {
        if (!validateForm()) {
            event.preventDefault(); // Impede o envio se houver erros
        }
    });
});