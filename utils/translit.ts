import cyrillicToTranslit from 'cyrillic-to-translit-js'
export default (value: string) => {
    return cyrillicToTranslit({ preset: 'ru' })
        .transform(value.toLowerCase(), '-')
        .replaceAll('#', '')
        .replaceAll('№', '')
}