function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = args.context;
}