<div class="ns-form-item">
    <label>
        <slot />
        <div class="label">
            <slot name="label" />
        </div>
        <div class="description">
            <slot name="description" />
        </div>
        <div class="message">
            <slot name="message" />
        </div>
    </label>
</div>

<style lang="scss">
    .ns-form-item {
        input,
        textarea,
        select,
        radio,
        checkbox,
        button {
        }

        label {
            position: relative;
            display: block;
            width: 100%;

            .label {
                position: absolute;
                top: 10px;
                padding: 0 18px;
                pointer-events: none;
                display: block;
                transition: 0.2s ease all;
                color: rgba(255, 255, 255, 0.5);
            }

            .description {
                color: rgba(255, 255, 255, 0.333);
            }

            .message {
                display: none;
            }

            input,
            textarea,
            select,
            radio,
            checkbox,
            button,
            input {
                padding: 15px 18px 5px;
                border-radius: 5px;
                border: 1px solid transparent;
                background: rgba(255, 255, 255, 0.0677);
                color: rgba(255, 255, 255, 0.667);
                display: block;
                width: 100%;
                transition: border-color 0.15s ease-in-out,
                    box-shadow 0.15s ease-in-out;

                &::placeholder {
                    color: transparent;
                }

                &:focus ~ .label,
                &:not([placeholder])[required]:valid ~ .label,
                &[placeholder]:not(:placeholder-shown) ~ .label {
                    top: 3px;
                    font-size: 66.67%;
                    color: rgba(255, 255, 255, 0.333);
                }

                &:focus {
                    outline: none;
                    border-color: rgba(16, 87, 149, 1);
                    box-shadow: 0 0 0 0.25rem rgba(16, 87, 149, 0.667);
                }
            }

            textarea {
                resize: vertical;
            }
        }

        @keyframes label {
        }
    }
</style>
