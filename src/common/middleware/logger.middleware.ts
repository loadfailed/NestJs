export function logger(req: any, res: any, next: () => void) {
  const { method, path } = req
  console.log(`中间件拦截( ${method} : '${path}' )`)
  next()
}
