import {usePostPreviewMutation} from '@yii-dev-panel/app/Module/Gii/API/Gii';
import {createYupValidationSchema} from '@yii-dev-panel/sdk/Adapter/yup/yii.validator';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {Box, Button, ButtonGroup} from '@mui/material';
import * as React from 'react';
import {useContext} from 'react';
import {FormInput} from '@yii-dev-panel/app/Module/Gii/Component/FormInput';
import {StepProps} from '@yii-dev-panel/app/Module/Gii/Component/GeneratorSteps/Step.types';
import {mapErrorsToForm} from '@yii-dev-panel/app/Module/Gii/Component/errorMapper';
import {Context} from '@yii-dev-panel/app/Module/Gii/Context/Context';

export function PreviewStep({generator, onComplete}: StepProps) {
    const attributes = generator.attributes;
    const validationSchema = createYupValidationSchema(attributes);
    const context = useContext(Context);

    const form = useForm({
        mode: 'onBlur',
        resolver: yupResolver(validationSchema),
    });
    const [previewQuery] = usePostPreviewMutation();

    async function previewHandler(data: FieldValues) {
        console.log('preview', data);
        const response = await previewQuery({
            generator: generator.id,
            parameters: data,
        });
        console.log(response);
        if ('error' in response) {
            mapErrorsToForm(response, form);
            return;
        }

        // TODO: fix types
        // @ts-ignore
        context.setFiles(response.data.files);
        // @ts-ignore
        context.setParameters(data);
        // @ts-ignore
        context.setOperations(response.data.operations);
        onComplete();
    }

    return (
        <>
            <FormProvider {...form}>
                <Box component="form" onReset={form.reset} onSubmit={form.handleSubmit(previewHandler)} my={2}>
                    {Object.entries(attributes).map(([attributeName, attribute], index) => {
                        return (
                            <React.Fragment key={index}>
                                <Box mb={1}>
                                    <FormInput attributeName={attributeName} attribute={attribute} />
                                </Box>
                            </React.Fragment>
                        );
                    })}
                    <Box my={2}>
                        <ButtonGroup>
                            <Button type="submit" name="preview" variant="contained">
                                Preview
                            </Button>
                            <Button type="reset" color="warning">
                                Reset
                            </Button>
                        </ButtonGroup>
                    </Box>
                </Box>
            </FormProvider>
        </>
    );
}
