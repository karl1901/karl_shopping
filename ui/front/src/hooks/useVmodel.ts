export const useVmodel = (props: any, propName: string, emit: any) => {
  return computed({
    get() {
      return new Proxy(props[propName], {
        set(target, key, value) {
          emit(`update:${propName}`, {
            ...target,
            [key]: value
          })
          return true
        }
      })
    },
    set(val) {
      emit(`update:${propName}`, val)
    }
  })
}
