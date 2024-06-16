import { useMutation } from '@tanstack/react-query';
import { deleteOption } from '../../../../../../../utils/API/axios';

const useDeleteOptionMutation = (questionId?: string) => {
    return useMutation({
        mutationKey: [`deleteOption_${questionId}`],
        mutationFn: deleteOption,
    });
};

export default useDeleteOptionMutation;
